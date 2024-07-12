const Listing = require("./models/listing");
const expressError = require("./expressError");
const { Review } = require("./models/review");
const wrapAsync = require("./wrapAsync");

isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.urls = req.originalUrl;

    return res.redirect("/login");
  }
  next();
};

module.exports = isLoggedIn;
module.exports.savedurl = (req, res, next) => {
  if (req.session.urls) {
    res.locals.urls = req.session.urls;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  if (req.user._id.toString() === listing.owner._id.toString()) {
    await Listing.findByIdAndUpdate(id, newDetail, { new: true });
    req.flash("success", "Updated Successfully");
    res.redirect(`/listing/${id}`);
    next();
  } else {
    throw new expressError("404", "you are not authorised user");
  }
};
module.exports.reviewCheck = wrapAsync(async (req, res, next) => {
  console.log(req.params);
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  console.log(res.locals.user._id, +" ", review);
  if (res.locals.user._id.toString() === review.author.toString()) {
    await Listing.findByIdAndUpdate(id, { $pull: { Review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    next();
  } else {
    throw new expressError("404", "you are not the user of this review");
  }
});
