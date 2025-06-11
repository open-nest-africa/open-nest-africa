const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.resetPasswordToken;
      },
    },
    verifyEmailOtp: {
      type: String,
      default: '',
    },
    verifyEmailOtpExpiredAt: {
      type: Number,
      default: 0,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);