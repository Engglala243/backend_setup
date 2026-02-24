module.exports = responseHandler;

function responseHandler(req, res, message, status = true, data = {}) {
    if (typeof message === "object" && message.message) {
        return res.status(message.status || 400).json({
            status: false,
            message: message.message
        });
    }

    return res.status(status ? 200 : 400).json({
        status,
        message,
        data
    });
}
