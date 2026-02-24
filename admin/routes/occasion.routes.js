const express = require("express");
const router = express.Router();
const verifyToken = require("_middleware/verify-token");
const controllers = require("../controllers/occasion.controller");
const schema = require("../validate_schema/occasion.schema");

router.post("/", verifyToken, schema.create, controllers.create);
router.get("/", verifyToken, controllers.getAll);
router.get("/:id", verifyToken, controllers.getById);
router.put("/:id", verifyToken, schema.update, controllers.update);
router.delete("/:id", verifyToken, controllers.deleteOccasion);

module.exports = router;