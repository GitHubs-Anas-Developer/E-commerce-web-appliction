const mongoose = require("mongoose");
const colors = require("colors"); // Import colors directly

const dataBaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully".bgBlue);
  } catch (error) {
    console.log("Database not connected", error);
  }
};

module.exports = dataBaseConnect;
