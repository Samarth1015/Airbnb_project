const express = require("express");
const { reviewCheck } = require("../authenticate");
const { Review } = require("../models/review");
const Listing = require("../models/listing");
const reviewControl = require("../controllers/reviews");

const router = express.Router({ mergeParams: true });
router.post("/", reviewControl.createReview);
router.delete("/:reviewId", reviewCheck, reviewControl.deleteReview);
module.exports = router;
