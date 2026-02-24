const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

module.exports = {
    create,
    update
};

function create(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        description: Joi.string().optional().allow(null, ""),
        image: Joi.string().optional().allow(null, "")
    });
    validateRequest(req, res, next, schema);
}

function update(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).optional(),
        description: Joi.string().optional().allow(null, ""),
        image: Joi.string().optional().allow(null, "")
    });
    validateRequest(req, res, next, schema);
}