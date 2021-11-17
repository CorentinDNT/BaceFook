const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
const cors = require("cors");

//ROUTES
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));
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

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
