const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const files = fs.readdirSync(__dirname).filter((file) => {
    return (
        file.indexOf(".") !== 0 && file !== basename && file.endsWith(".model.js")
    );
});

module.exports = files;
