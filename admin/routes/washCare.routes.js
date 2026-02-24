const express = require("express");
const router = express.Router();
const washCareController = require("../controllers/washCare.controller");
const verifyToken = require("_middleware/verify-token");
const { createSchema, updateSchema } = require("../validate_schema/washCare.schema");

router.post("/", verifyToken, createSchema, washCareController.create);
router.get("/", verifyToken, washCareController.getAll);
router.get("/:id", verifyToken, washCareController.getById);
router.put("/:id", verifyToken, updateSchema, washCareController.update);
router.delete("/:id", verifyToken, washCareController.delete);

module.exports = router;