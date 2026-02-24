const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/categories", require("./category.routes"));
router.use("/brands", require("./brand.routes"));
router.use("/colors", require("./color.routes"));
router.use("/fabrics", require("./fabric.routes"));
router.use("/occasions", require("./occasion.routes"));
router.use("/borders", require("./border.routes"));
router.use("/fashion-trends", require("./fashionTrend.routes"));
router.use("/patterns", require("./pattern.routes"));
router.use("/sizes", require("./size.routes"));
router.use("/themes", require("./theme.routes"));
router.use("/types", require("./type.routes"));
router.use("/wash-cares", require("./washCare.routes"));
router.use("/products", require("./product.routes"));

module.exports = router;
