if (process.env.NODE_ENV != "Production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const review = require("./routes/review");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const multer = require("multer");
const { cloudinary, storage } = require("./cloudinaryObj");
const upload = multer({ storage });

const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: "secretcode",
  },
  touchAfter: 24 * 60 * 60,
});
store.on("error", () => {
  console.log("error");
});
// Session configuration
let sessionObject = {
  store,
  secret: "secretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
const User = require("./models/user");

const flash = require("connect-flash");
app.use(express.urlencoded());
const mongoose = require("mongoose");
const listing = require("./routes/listing");
let expressError = require("./expressError");
const path = require("path");
const methodOverride = require("method-override");
let Listing = require("./models/listing");
const passport = require("passport");
const LocalStrategy = require("passport-local");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
let user = require("./routes/user");
main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}
let port = 8080;
app.use(session(sessionObject));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  console.log(req.user + " user");
  console.log(req.path, req.method);
  console.log("hello");
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  console.log(req.user);
  res.locals.user = req.user;

  next();
});
app.get("/set-flash", (req, res) => {
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

// app.get("/", (req, res) => {
//   res.send("working");
// });
app.use("/", user);
app.use("/listing", listing);
app.use("/listing/:id/review", review);
app.all("*", (req, res, next) => {
  res.redirect("/listing");
});
app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong " } = err;
  res.render("error.ejs", { message });
  next(err);

  // res.status(status).send(message);
});
