const express = require("express");
const router = express.Router();
const typeController = require("../controllers/type.controller");
const verifyToken = require("_middleware/verify-token");
const { createSchema, updateSchema } = require("../validate_schema/type.schema");

router.post("/", verifyToken, createSchema, typeController.create);
router.get("/", verifyToken, typeController.getAll);
router.get("/:id", verifyToken, typeController.getById);
router.put("/:id", verifyToken, updateSchema, typeController.update);
router.delete("/:id", verifyToken, typeController.delete);

module.exports = router;