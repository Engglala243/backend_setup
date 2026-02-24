const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { filterSchema } = require("../../admin/validate_schema/product.schema");

router.post("/filter", filterSchema, productController.getAllWithFilters);
router.get("/featured", productController.getFeatured);
router.get("/trending", productController.getTrending);
router.get("/search", productController.searchProducts);
router.get("/category/:categoryId", productController.getByCategory);
router.get("/brand/:brandId", productController.getByBrand);
router.get("/related/:productId", productController.getRelated);
router.get("/:id", productController.getById);

module.exports = router;