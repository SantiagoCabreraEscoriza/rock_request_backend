require("dotenv").config();
const express = require("express");
const { errorMiddleware } = require("./src/middlewares/error_middleware");
const logger = require("./src/logs/logs");
const connectDb = require("./src/config/db/db");
const usersRouter = require("./src/api/routes/User");
const session = require("express-session");
const passport = require("passport");
const { isAuth } = require("./src/middlewares/passport");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/api/v1/auth", (req, res, next) => {
  return res.status(200).json("Holaaaaaa");
});

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(errorMiddleware);
app.use("/api/v1/users", usersRouter);

const server = app.listen(PORT, () => {
  try {
    const address = server.address();
    logger.info(address.port);
    logger.info(`Server running on port ${PORT}`);
  } catch (error) {
    logger.error("El servidor no está corriendo");
  }
});
