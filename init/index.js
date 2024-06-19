let initData = require("./data");
let Listing = require("../models/listing");
let mongoose = require("mongoose");
main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
Listing.insertMany(initData.data);
