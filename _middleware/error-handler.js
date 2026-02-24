module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        return res.status(400).json({ status: false, message: err });
    }

    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    return res.status(500).json({ status: false, message: err.message });
}
