const { Review } = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async (req, res, next) => {
  let { id } = req.params;
  let { review } = req.body;
  console.log(review);
  let newreview = new Review(review);
  await newreview.save();
  let listing = await Listing.findById(id);
  listing.Review.push(newreview);
  await listing.save();
  console.log("saved review!");
  res.redirect(`/listing/${id}`);
};

module.exports.deleteReview = async (req, res, next) => {
  let { id } = req.params;
  res.redirect(`/listing/${id}`);
};
