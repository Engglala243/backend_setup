const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

module.exports = {
    create,
    update
};

function create(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        hex_code: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).optional().allow(null, "")
    });
    validateRequest(req, res, next, schema);
}

function update(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).optional(),
        hex_code: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).optional().allow(null, "")
    });
    validateRequest(req, res, next, schema);
}