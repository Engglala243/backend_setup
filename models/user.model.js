const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM("admin", "web_user"),
            allowNull: false,
            defaultValue: "web_user"
        },
        profile_image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        base_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        otp: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        access_token: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        is_active: {
            type: DataTypes.TINYINT,
            defaultValue: 1
        },
        is_deleted: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    };

    const options = {
        tableName: "users",
        name: {
            singular: "user",
            plural: "users"
        },
        defaultScope: {
            attributes: {
                exclude: ["access_token", "is_deleted", "created_by", "updated_by", "otp"]
            }
        },
        underscored: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci"
    };

    return sequelize.define("User", attributes, options);
}
