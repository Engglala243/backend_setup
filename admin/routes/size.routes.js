const express = require("express");
const router = express.Router();
const sizeController = require("../controllers/size.controller");
const verifyToken = require("_middleware/verify-token");
const { createSchema, updateSchema } = require("../validate_schema/size.schema");

router.post("/", verifyToken, createSchema, sizeController.create);
router.get("/", verifyToken, sizeController.getAll);
router.get("/:id", verifyToken, sizeController.getById);
router.put("/:id", verifyToken, updateSchema, sizeController.update);
router.delete("/:id", verifyToken, sizeController.delete);

module.exports = router;