const { use } = require("passport");
const Listing = require("../models/listing");
const flash = require("connect-flash");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

module.exports.index = async (req, res) => {
  const allList = await Listing.find();
  res.render("index", { allList });
};

module.exports.addListing = async (req, res) => {
  console.log(req.file);
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let { path: url, filename } = req.file;
  console.log(req.body.listing);
  const listing = new Listing(req.body.listing);
  listing.image = { url, filename };
  listing.geometry = response.body.features[0].geometry;

  await listing.save();
  req.flash("success", "Added Successfully");
  res.redirect("/listing");
};

module.exports.newPage = (req, res) => {
  res.render("new", { user_id: req.user._id });
};

module.exports.showList = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)

    .populate("Review")
    .populate("owner");
  console.log(listing);
  console.log(req.user._id, " ", listing.owner._id);
  let user_id = req.user._id.toString();

  console.log(listing);

  res.render("show", { listing, user_id });
};

module.exports.editListingPage = async (req, res) => {
  const { id } = req.params;
  const user = await Listing.findById(id);
  originalImageUrl = user.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  console.log("user info");
  console.log(user);
  res.render("edit", { user, originalImageUrl });
};
module.exports.editPatch = async (req, res) => {
  let { id } = req.params;
  const newDetail = req.body.listing;
  if (typeof req.file !== "undefined") {
    let { path: url, filename } = req.file;
    newDetail.image = { url, filename };
  }
  await Listing.findByIdAndUpdate(id, newDetail);
  res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Deleted Successfully");

  res.redirect("/listing");
};
