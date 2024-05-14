const mongoose = require("mongoose");

const environments = require("../utils/environments");

const { MONGO_ATLAS_URI } = environments;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(MONGO_ATLAS_URI, {
      autoIndex: true,
      autoCreate: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
