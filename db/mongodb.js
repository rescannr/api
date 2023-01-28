const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

const dbUrl = process.env.DB_URL;

const connect = async () => {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "rescannr",
  });
  const db = mongoose.connection;
  db.on("error", () => {
    console.log("could not connect");
  });
  db.once("open", () => {
    console.log("> Successfully connected to database");
  });
};

module.exports = connect;
