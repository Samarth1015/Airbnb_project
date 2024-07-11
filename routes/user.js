const express = require("express");

const wrapAsync = require("../wrapAsync");

const router = express.Router({ mergeParams: true });
let User = require("../models/user");
const passport = require("passport");
const flash = require("connect-flash");
const { savedurl } = require("../authenticate");
const userControl = require("../controllers/user");

router.get("/signup", wrapAsync(userControl.signupPage));
router.post("/", wrapAsync(userControl.postNew));
router
  .route("/login")
  .get(wrapAsync(userControl.loginPage))

  .post(
    savedurl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userControl.postCheck)
  );
router.get("/logout", userControl.logout);
module.exports = router;
