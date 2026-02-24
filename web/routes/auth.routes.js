const express = require("express");
const router = express.Router();
const verifyToken = require("_middleware/verify-token");
const uploadProfileImage = require("_middleware/upload-profile-image");
const controllers = require("../controllers/auth.controller");
const schema = require("../validate_schema/auth.schema");

router.post("/send-signup-otp", schema.sendSignUpOTP, controllers.sendSignUpOTP);
router.post("/signup", schema.signUp, controllers.signUp);
router.post("/send-login-otp", schema.sendLoginOTP, controllers.sendLoginOTP);
router.post("/login", schema.login, controllers.login);
router.get("/profile", verifyToken, controllers.getProfile);
router.put("/profile", verifyToken, uploadProfileImage, schema.updateProfile, controllers.updateProfile);

module.exports = router;
