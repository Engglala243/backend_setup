const express = require("express");
const router = express.Router();
const fashionTrendController = require("../controllers/fashionTrend.controller");
const verifyToken = require("_middleware/verify-token");
const { createSchema, updateSchema } = require("../validate_schema/fashionTrend.schema");

router.post("/", verifyToken, createSchema, fashionTrendController.create);
router.get("/", verifyToken, fashionTrendController.getAll);
router.get("/:id", verifyToken, fashionTrendController.getById);
router.put("/:id", verifyToken, updateSchema, fashionTrendController.update);
router.delete("/:id", verifyToken, fashionTrendController.delete);

module.exports = router;