const Joi = require("joi");

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow("", null),
        price: Joi.number().positive().required(),
        discount_price: Joi.number().positive().allow(null),
        discount_percentage: Joi.number().integer().min(0).max(100).allow(null),
        sku: Joi.string().allow("", null),
        stock_quantity: Joi.number().integer().min(0).required(),
        category_id: Joi.string().required(),
        brand_id: Joi.string().allow("", null),
        fabric_id: Joi.string().allow("", null),
        occasion_id: Joi.string().allow("", null),
        border_id: Joi.string().allow("", null),
        pattern_id: Joi.string().allow("", null),
        size_id: Joi.string().allow("", null),
        theme_id: Joi.string().allow("", null),
        type_id: Joi.string().allow("", null),
        wash_care_id: Joi.string().allow("", null),
        fashion_trend_id: Joi.string().allow("", null),
        colors: Joi.alternatives().try(
            Joi.array().items(Joi.string()),
            Joi.string()
        ).allow(null),
        is_featured: Joi.number().integer().valid(0, 1).allow(null),
        is_trending: Joi.number().integer().valid(0, 1).allow(null)
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(""),
        description: Joi.string().allow("", null),
        price: Joi.number().positive(),
        discount_price: Joi.number().positive().allow(null),
        discount_percentage: Joi.number().integer().min(0).max(100).allow(null),
        sku: Joi.string().allow("", null),
        stock_quantity: Joi.number().integer().min(0),
        category_id: Joi.string().empty(""),
        brand_id: Joi.string().allow("", null),
        fabric_id: Joi.string().allow("", null),
        occasion_id: Joi.string().allow("", null),
        border_id: Joi.string().allow("", null),
        pattern_id: Joi.string().allow("", null),
        size_id: Joi.string().allow("", null),
        theme_id: Joi.string().allow("", null),
        type_id: Joi.string().allow("", null),
        wash_care_id: Joi.string().allow("", null),
        fashion_trend_id: Joi.string().allow("", null),
        colors: Joi.alternatives().try(
            Joi.array().items(Joi.string()),
            Joi.string()
        ).allow(null),
        is_featured: Joi.number().integer().valid(0, 1).allow(null),
        is_trending: Joi.number().integer().valid(0, 1).allow(null)
    });
    validateRequest(req, next, schema);
}

function filterSchema(req, res, next) {
    const schema = Joi.object({
        category: Joi.string().allow("", null),
        priceMin: Joi.number().positive().allow(null),
        priceMax: Joi.number().positive().allow(null),
        color: Joi.array().items(Joi.string()).allow(null),
        fabric: Joi.array().items(Joi.string()).allow(null),
        occasion: Joi.array().items(Joi.string()).allow(null),
        discount: Joi.number().integer().min(0).max(100).allow(null),
        rating: Joi.number().min(0).max(5).allow(null),
        sort: Joi.string().valid("whats_new", "popularity", "better_discount", "price_low_to_high", "price_high_to_low", "custom_rating").allow(null),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(20)
    });
    validateRequest(req, next, schema);
}

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(", ")}`);
    } else {
        req.body = value;
        next();
    }
}

module.exports = {
    createSchema,
    updateSchema,
    filterSchema
};