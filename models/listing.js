const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://foyr.com/learn/wp-content/uploads/2019/03/Villa_Mistral-Singapore.jpg",
    // set: (v) => {
    //   return v === ""
    //     ? "https://foyr.com/learn/wp-content/uploads/2019/03/Villa_Mistral-Singapore.jpg"
    //     : v;
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

let Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
