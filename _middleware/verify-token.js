const jwt = require("jsonwebtoken");

module.exports = verifyToken;

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(403).json({
            status: false,
            message: 'Please provide a valid "Bearer Token"!'
        });
    }

    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized! Access Token was expired!",
                is_expire: true
            });
        }
        req.auth_params = {
            user_id: decoded.userId,
            role: decoded.role
        };
        next();
    });
}
