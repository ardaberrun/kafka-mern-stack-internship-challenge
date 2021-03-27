const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://mongo/kafka", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB: ok");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
