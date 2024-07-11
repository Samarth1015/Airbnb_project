let User = require("../models/user");

// signupPage
module.exports.signupPage = (req, res, next) => {
  res.render("../views/user/user.ejs");
};

//post request to add new user
module.exports.postNew = async (req, res, next) => {
  let { email, password, username } = req.body;
  let newuser = new User({
    email: email,
    username: username,
  });
  let newusers = await User.register(newuser, password);

  req.login(newuser, (err) => {
    req.flash("success", "welcome to wanderlust");
    res.redirect("/listing");
  });
};

//login page
module.exports.loginPage = (req, res, next) => {
  res.render("../views/user/login.ejs");
};

// post req for login page
module.exports.postCheck = async (req, res, next) => {
  await req.flash("success", "welcome to wanderlust!");
  console.log(res.locals.urls + "samarth");
  if (res.locals.urls) {
    await res.redirect(res.locals.urls);
  } else {
    res.redirect("/listing");
  }
};

// logout

module.exports.logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout Successfully");
    res.redirect("/listing");
  });
  console.log("hell");
};
