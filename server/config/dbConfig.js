const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log(`Error connecting database : ${err}`);
});
module.exports = mongoose;
