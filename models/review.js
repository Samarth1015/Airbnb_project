const mongoose = require("mongoose");
const User = require("./user");
let reviewschema = mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

let Review = mongoose.model("Review", reviewschema);
module.exports = { Review };
