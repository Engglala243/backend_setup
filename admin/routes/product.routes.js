const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const verifyToken = require("_middleware/verify-token");
const {
  createSchema,
  updateSchema,
  filterSchema,
} = require("../validate_schema/product.schema");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fs = require("fs");
    const uploadPath = "public/uploads/products/";

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

router.post(
  "/",
  verifyToken,
  upload.array("images", 10),
  createSchema,
  productController.create,
);
router.get("/", verifyToken, productController.getAll);
router.post(
  "/filter",
  verifyToken,
  filterSchema,
  productController.getAllWithFilters,
);
router.get("/:id", verifyToken, productController.getById);
router.put(
  "/:id",
  verifyToken,
  upload.array("images", 10),
  updateSchema,
  productController.update,
);
router.delete("/:id", verifyToken, productController.delete);

module.exports = router;
