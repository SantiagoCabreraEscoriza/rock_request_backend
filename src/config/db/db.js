const mongoose = require("mongoose");
const logger = require("../../logs/logs.js");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    logger.info("Database connected 👍");
  } catch (error) {
    logger.error(error);
  }
};

module.exports = connectDb;
