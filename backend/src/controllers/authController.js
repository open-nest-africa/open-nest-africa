const { requestPasswordReset, resetPassword, handleGitHubAuth, register, login, sendEmailVerifyOtp, requestEmailVerifyOtp, verifyEmail } = require("../services/authService");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const handleRegister = async (req, res) => {
  
  try {
    const { name, email, password } = req.body;

    const { user, token } = await register(name, email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error creating user: ", error);

    if (error.message === "Required fields missing!") {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === "User already exists") {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: "Error creating user" });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await login(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User logged in successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging user: ", error);

    if (error.message === "Email and Password are required!") {
      return res.status(400).json({ error: error.message });
    }
    
    if (error.message === "Invalid email" || error.message === "Invalid password") {
      return res.status(401).json({ error: error.message });
    }

    res.status(500).json({ error: "Error creating user" });
  }
}

const handleLogout = async (req, res) => {
  try {
    res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  });
  return res.status(200).json({ message: 'Logged out successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging out' });
  }
}

const handleSendEmailVerifyOtpRequest = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    await requestEmailVerifyOtp(userId);

    res.status(200).json({ message: 'OTP sent to your email address.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    
    if (error.message === 'Email has already been verified') {
      return res.status(400).json({ error: error.message });
    }

    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: 'Could not send verification OTP' });
  }
};

const handleVerifyEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otp } = req.body;

    await verifyEmail(userId, otp);

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error('Error verifying email:', error);
    
    if (error.message === 'Missing details' || error.message === 'Invalid OTP' || error.message === 'OTP is expired') {
      return res.status(401).json({ error: error.message });
    }

    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: 'Could not verify email' });
  }

};

const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({ message: 'User is authenticated', userId: req.user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const handlePasswordResetRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const { resetUrl } = await requestPasswordReset(email);
    res.json({
      message: "Password reset email sent",
      resetUrl,
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === "Failed to send reset email") {
      return res.status(500).json({ error: error.message });
    }
    res.status(500).json({ error: "Error processing password reset request" });
  }
};

const handlePasswordReset = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await resetPassword(token, newPassword);
    res.json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Password reset error:", error);
    if (error.message === "Invalid or expired reset token") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error resetting password" });
  }
};

const githubAuth = async (req, res) => {
  try {
    const { code } = req.query;
    const result = await handleGitHubAuth(code);
    res.json(result);
  } catch (error) {
    console.error("Error during authentication:", error.message || error);
    if (error.message === "Bad credentials") {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: "Error during authentication" });
  }
};

module.exports = {
  handlePasswordResetRequest,
  handlePasswordReset,
  githubAuth,
  handleRegister,
  handleLogin,
  handleLogout,
  handleSendEmailVerifyOtpRequest,
  handleVerifyEmail,
  isAuthenticated,
};
