const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

module.exports = {
    sendSignUpOTP,
    signUp,
    sendLoginOTP,
    login,
    updateProfile
};

function sendSignUpOTP(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(10).max(15).optional()
    });
    validateRequest(req, res, next, schema);
}

function signUp(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.number().min(1000).max(9999).required()
    });
    validateRequest(req, res, next, schema);
}

function sendLoginOTP(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });
    validateRequest(req, res, next, schema);
}

function login(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.number().min(1000).max(9999).required()
    });
    validateRequest(req, res, next, schema);
}

function updateProfile(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).optional(),
        phone: Joi.string().min(10).max(15).optional().allow(null, "")
    });
    validateRequest(req, res, next, schema);
}
