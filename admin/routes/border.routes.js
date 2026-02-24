const express = require("express");
const router = express.Router();
const borderController = require("../controllers/border.controller");
const verifyToken = require("_middleware/verify-token");
const { createSchema, updateSchema } = require("../validate_schema/border.schema");

router.post("/", verifyToken, createSchema, borderController.create);
router.get("/", verifyToken, borderController.getAll);
router.get("/:id", verifyToken, borderController.getById);
router.put("/:id", verifyToken, updateSchema, borderController.update);
router.delete("/:id", verifyToken, borderController.delete);

module.exports = router;