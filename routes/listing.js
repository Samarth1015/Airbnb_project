const express = require("express");

const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinaryObj");
const upload = multer({ storage });
const isOwner = require("../authenticate");

const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../wrapAsync");
const session = require("express-session");
const flash = require("connect-flash");
const isLoggedIn = require("../authenticate");
const User = require("../models/user");
const listingRoutes = require("../controllers/listing");

// Routes

router
  .route("/")
  .get(wrapAsync(listingRoutes.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingRoutes.addListing)
  );

// add listing page
router.get("/new", isLoggedIn, listingRoutes.newPage);

router
  .route("/:id")
  .get(
    isLoggedIn,

    wrapAsync(listingRoutes.showList)
  )
  .patch(
    isOwner,
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingRoutes.editPatch)
  )
  .delete(isLoggedIn, wrapAsync(listingRoutes.deleteListing));

router.get("/:id/edit", isLoggedIn, wrapAsync(listingRoutes.editListingPage));

module.exports = router;
