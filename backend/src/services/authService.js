const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const User = require("../models/User");
const { sendPasswordResetEmail, sendEmailVerifyOtp } = require("../config/email");

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ID = process.env.VITE_GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_GITHUB_CLIENT_SECRET;
const NODE_ENV = process.env.NODE_ENV;

const register = async (name, email, password) => {

  if(!name || !email || !password) {
    throw new Error('Required fields missing!');
  }
  
  const existingUser = await User.findOne({email});
  if(existingUser) {
    throw new Error('User already exists');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  await user.save();

  const token = jwt.sign({ id: user._id}, JWT_SECRET, { expiresIn: '1d' });

  return { user, token };
};

const login = async (email, password) => {
  if(!email || !password) {
    throw new Error('Email and Password are required!');
  }

  const user = await User.findOne({ email });

  if(!user) {
    throw new Error('Invalid email')
  }

  const passwordIsMatch = await bcrypt.compare(password, user.password);
  if(!passwordIsMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user._id}, JWT_SECRET, { expiresIn: '1d' });

  return { user, token };
}

const requestEmailVerifyOtp = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if(user.isEmailVerified) {
	throw new Error('Email has already been verified');
  }

  const otp = String(Math.floor (10000 + Math.random() * 90000));

  user.verifyEmailOtp = otp;
  user.verifyEmailOtpExpiredAt = Date.now() + 20 * 60 * 1000;

  await user.save();

  const emailSent = await sendEmailVerifyOtp(user.email, otp);
  if (!emailSent) {
    throw new Error("Failed to send verification OTP email");
  }
}

const verifyEmail = async (userId, otp) => {
  console.log("UserId:", userId);
  console.log("OTP received:", otp);
  if(!userId || !otp) {
    throw new Error('Missing details');
  }

  const user = await User.findById(userId);
  if(!user) {
    throw new Error('User not found');
  }

  if(user.verifyEmailOtp === '' || user.verifyEmailOtp !== otp) {
    throw new Error('Invalid OTP');
  }

  if(user.verifyEmailOtpExpiredAt < Date.now()) {
    throw new Error('OTP is expired')
  }

  user.isEmailVerified = true;
  user.verifyEmailOtp = '';
  user.verifyEmailOtpExpiredAt = 0;

  await user.save();
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const emailSent = await sendPasswordResetEmail(email, resetToken);
  if (!emailSent) {
    throw new Error("Failed to send reset email");
  }

  return { resetUrl };
};

const resetPassword = async (token, newPassword) => {
  const decoded = jwt.verify(token, JWT_SECRET);

  const user = await User.findOne({
    _id: decoded.userId,
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or expired reset token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return true;
};

const handleGitHubAuth = async (code) => {
  const tokenResponse = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
    },
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!tokenResponse.data.access_token) {
    throw new Error("Bad credentials");
  }

  const accessToken = tokenResponse.data.access_token;

  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    accessToken,
    user: userResponse.data,
  };
};

module.exports = {
  requestPasswordReset,
  resetPassword,
  handleGitHubAuth,
  register,
  login,
  requestEmailVerifyOtp,
  verifyEmail,
};
