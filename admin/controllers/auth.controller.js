const responseHandler = require("_middleware/response-handler");
const service = require("../services/auth.service");
const msg = require("_config/message.json");

module.exports = {
    login,
    getProfile
};

async function login(req, res, next) {
    service
        .login(req.body)
        .then((result) => responseHandler(req, res, msg.admin.login, true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function getProfile(req, res, next) {
    service
        .getProfile(req.auth_params)
        .then((admin) => responseHandler(req, res, msg.admin.get, true, admin))
        .catch((error) => responseHandler(req, res, error));
}
