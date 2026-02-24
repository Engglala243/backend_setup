const express = require("express");
const router = express.Router();
const themeController = require("../controllers/theme.controller");
const verifyToken = require("_middleware/verify-token");
const { createSchema, updateSchema } = require("../validate_schema/theme.schema");

router.post("/", verifyToken, createSchema, themeController.create);
router.get("/", verifyToken, themeController.getAll);
router.get("/:id", verifyToken, themeController.getById);
router.put("/:id", verifyToken, updateSchema, themeController.update);
router.delete("/:id", verifyToken, themeController.delete);

module.exports = router;