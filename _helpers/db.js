const path = require("path");
const config = require("../_config/config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const logger = require("./logger");
const models = require("../models");
const dotenv = require("dotenv");

dotenv.config();

function resolveConfigValue(value) {
    if (typeof value === "string" && value.startsWith("${") && value.endsWith("}")) {
        const envKey = value.slice(2, -1);
        return process.env[envKey] || config.database[envKey];
    }
    return value;
}

const resolvedDbConfig = Object.keys(config.database).reduce((acc, key) => {
    acc[key] = resolveConfigValue(config.database[key]);
    return acc;
}, {});

const db = {};
module.exports = db;

db.ready = initialize();

async function initialize() {
    const { host, port, user, password, database, timezone } = resolvedDbConfig;

    const connectionConfig = { host, port, user, password };

    try {
        const connection = await mysql.createConnection(connectionConfig);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        await connection.end();

        const sequelize = new Sequelize(database, user, password, {
            host,
            port,
            dialect: "mysql",
            timezone,
            logging: (msg) => (process.env.NODE_ENV === "production" ? logger.info(msg) : console.log(msg))
        });

        await sequelize.authenticate();
        console.log("Database connection established successfully.");

        if (models.length > 0) {
            models.forEach((file) => {
                const model = require(path.join(__dirname, "..", "models", file))(sequelize);
                db[model.name] = model;
            });
            Object.keys(db).forEach((modelName) => {
                if (db[modelName].associate) {
                    db[modelName].associate(db);
                }
            });
        }
        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
    } catch (error) {
        console.error("Database Initialization Error:", error);
        throw error;
    }
}
