require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const usersRoutes = require("./src/routes/usersRoutes");

const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

const PORT = process.env.VITE_PORT || 4000;

connectDB();

app.use("/api/auth", authRoutes);
app.use("/user", usersRoutes);

app.listen(PORT, () => {
	console.log(
		`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
	);
});
