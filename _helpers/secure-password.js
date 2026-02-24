const bcrypt = require("bcryptjs");

module.exports = {
    hash: async function (password) {
        return await bcrypt.hash(password, 10);
    },
    compare: async function (password, hash) {
        return await bcrypt.compare(password, hash);
    }
};
