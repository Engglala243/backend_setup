const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, "../public/uploads/profiles/");
        fs.mkdir(uploadDir, { recursive: true, mode: 0o755 }, (err) => {
            if (err) return cb(err);
            cb(null, uploadDir);
        });
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `profile-${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images are allowed."), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
}).single("profile_image");

module.exports = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                status: false,
                message: err.message
            });
        }
        next();
    });
};
