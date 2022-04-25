const mongoose = require("mongoose");
const { connect } = require("mongoose");

const DB = "mongodb://localhost:27017/formation";
connect(DB, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("db is connected ");
  }
});
