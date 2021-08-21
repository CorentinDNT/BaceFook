//MODULES
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");

//ROUTES
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	if (req.headers.origin) {
		const origin = req.headers.origin;
		res.setHeader("Access-Control-Allow-Origin", origin);
	}
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

//USE
app.use(express.json());
app.use(cookieParser());

//JWT
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
	res.status(200).send(res.locals.user._id);
});

//ROUTES
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
