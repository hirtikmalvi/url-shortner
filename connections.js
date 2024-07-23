const mongoose = require("mongoose");

const connectMongoDB = async () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB CONNECTED");
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

module.exports = {
  connectMongoDB,
};
