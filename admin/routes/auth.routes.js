const express = require("express");
const router = express.Router();
const verifyToken = require("_middleware/verify-token");
const controllers = require("../controllers/auth.controller");
const schema = require("../validate_schema/auth.schema");

router.post("/login", schema.login, controllers.login);
router.get("/profile", verifyToken, controllers.getProfile);

module.exports = router;
