const express = require("express");
const router = express.Router();
const patternController = require("../controllers/pattern.controller");
const verifyToken = require("_middleware/verify-token");
const { createSchema, updateSchema } = require("../validate_schema/pattern.schema");

router.post("/", verifyToken, createSchema, patternController.create);
router.get("/", verifyToken, patternController.getAll);
router.get("/:id", verifyToken, patternController.getById);
router.put("/:id", verifyToken, updateSchema, patternController.update);
router.delete("/:id", verifyToken, patternController.delete);

module.exports = router;