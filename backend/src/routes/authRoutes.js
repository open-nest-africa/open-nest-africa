const express = require("express");
const router = express.Router();
const { handlePasswordResetRequest, handlePasswordReset, githubAuth, handleRegister, handleLogin, handleLogout, handleSendEmailVerifyOtpRequest, handleVerifyEmail, isAuthenticated, } = require("../controllers/authController");
const { userAuth } = require("../middleware/userAuth");

router.post("/password-request", handlePasswordResetRequest);
router.post("/password-reset", handlePasswordReset);
router.get("/github", githubAuth);
router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.post("/send-email-verify-otp", userAuth, handleSendEmailVerifyOtpRequest);
router.post("/verify-email", userAuth, handleVerifyEmail);
router.post("/check", userAuth, isAuthenticated);

module.exports = router;
