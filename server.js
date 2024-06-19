const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
app.use(express.urlencoded());
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
let Listing = require("./models/listing");
const { title } = require("process");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

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

let port = 8080;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
app.get("/", (req, res) => {
  res.send("working");
});
// app.get("/testing", (req, res) => {
//   let new_user = new Listing({
//     title: "my home",
//     description: "hello welcome",
//     price: 2500,
//     location: "indore",
//     country: "India",
//   });
//   new_user.save().then((res) => {
//     console.log("saved to db");
//   });
// });

app.get("/listing", async (req, res) => {
  let allList = await Listing.find();
  res.render("index.ejs", { allList });
});
app.post("/listing", async (req, res) => {
  let listing = req.body.listing;
  new Listing(listing).save();
  res.redirect("/listing");
});
app.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  console.log(id);

  let user = await Listing.findById(id);

  res.render("edit.ejs", { user });
});
app.patch("/listing/:id", async (req, res) => {
  console.log(req.params);
  console.log("patch");

  let { id } = req.params;
  let new_detail = req.body.listing;
  await Listing.findByIdAndUpdate(id, new_detail, { new: true }).then(
    (resul) => {
      console.log(resul);
    }
  );
  res.redirect("/listing");
});

app.get("/listing/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id, "hello");
  let listing = await Listing.findById(id);
  res.render("show.ejs", { listing });
});

app.delete("/listing/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listing");
});
