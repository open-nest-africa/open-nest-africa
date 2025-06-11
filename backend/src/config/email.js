const nodemailer = require("nodemailer");
const User = require('../models/User');

const SMTP_SERVICE = process.env.SMTP_SERVICE;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
	service: SMTP_SERVICE || "gmail",
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASSWORD,
	},
});

const sendEmailVerifyOtp = async(email, otp) => {

  const mailOptions = {
	from: EMAIL_USER,
	to: email,
	subject: 'Email Verification OTP',
	html: `<h1>Verify Your Email</h1>
	<p>Welcome to OpenNest-Africa Website, a cozy hub where beginners—technical or non-technical—can explore, learn, and grow in the world of open source.</p>
	<br>
	<p>Your account has been created with email: ${email}. If you initiated the request, please enter the following code to verify your email address and complete your sign up.</p>
	<br><br>
	<h2
	style="
	display: inline-block;
	background-color: #0C9EDD;
	color: white;
	padding: 12px 20px;
	text-decoration: none;
	border-radius: 5px;
	font-weight: bold;
	">${otp}</h2>
	<br><br>
	<span>(This OTP will expire in 20 minutes)</span>
	<p>If you did not request this verification, please ignore this email. Your account will remain inactive until you verify your email address.</p>
	<br>Regards,
	<br>Open Nest Africa.`
  }
  
  try {
	await transporter.sendMail(mailOptions);
	return true;
  } catch (error) {
	console.error("Error sending email:", error);
	return false;
  }
}

const sendPasswordResetEmail = async (email, resetToken) => {
	const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Password Reset Request",
		html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetUrl}" 
        style="
        display: inline-block;
        background-color: #0C9EDD;
        color: white;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;"
        >Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		return true;
	} catch (error) {
		console.error("Error sending email:", error);
		return false;
	}
};

module.exports = {
	sendPasswordResetEmail,
	sendEmailVerifyOtp,
};
