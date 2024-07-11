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
addToDb = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6687ce4bba44a4927bd77141",
  }));
  await Listing.insertMany(initData.data);
};
addToDb();
