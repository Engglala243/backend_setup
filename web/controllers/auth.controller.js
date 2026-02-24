const responseHandler = require("_middleware/response-handler");
const service = require("../services/auth.service");
const msg = require("_config/message.json");

module.exports = {
    sendSignUpOTP,
    signUp,
    sendLoginOTP,
    login,
    getProfile,
    updateProfile
};

async function sendSignUpOTP(req, res, next) {
    service
        .sendSignUpOTP(req.body)
        .then((result) => responseHandler(req, res, msg.user.sendOTP, true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function signUp(req, res, next) {
    service
        .signUp(req.body)
        .then((result) => responseHandler(req, res, msg.user.register, true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function sendLoginOTP(req, res, next) {
    service
        .sendLoginOTP(req.body)
        .then((result) => responseHandler(req, res, msg.user.sendOTP, true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function login(req, res, next) {
    service
        .login(req.body)
        .then((result) => responseHandler(req, res, msg.user.login, true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function getProfile(req, res, next) {
    service
        .getProfile(req.auth_params)
        .then((user) => responseHandler(req, res, msg.user.get, true, user))
        .catch((error) => responseHandler(req, res, error));
}

async function updateProfile(req, res, next) {
    const updateData = req.body;
    if (req.file) {
        updateData.profile_image = req.file.filename;
    }

    service
        .updateProfile(updateData, req.auth_params)
        .then((result) => responseHandler(req, res, msg.user.update, true, result))
        .catch((error) => responseHandler(req, res, error));
}
