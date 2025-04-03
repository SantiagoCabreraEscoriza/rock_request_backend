const express = require("express");
const { errorMiddleware } = require("./src/middlewares/error_middleware");
const logger = require("./src/logs/logs");
const connectDb = require("./src/config/db/db");

const PORT = process.env.PORT || 3000;
const app = express();

connectDb();

app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
