const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_DB);
    console.log('DB connect');
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB
