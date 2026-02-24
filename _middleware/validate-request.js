module.exports = validateRequest;

function validateRequest(req, res, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        const errorMessage = error.details.map((x) => x.message).join(", ");
        return res.status(400).json({ status: false, message: errorMessage });
    }
    req.body = value;
    next();
}
