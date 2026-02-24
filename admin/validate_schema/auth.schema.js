const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

module.exports = {
    login
};

function login(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().length(4).required()
    });
    validateRequest(req, res, next, schema);
}
