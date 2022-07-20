var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/contactus", function (req, res) {
  res.render("contact");
});

app.get("/knowledge", function (req, res) {
  res.render("knowledge");
});

app.get("/community", function (req, res) {
  res.render("community");
});

app.listen(3000, (req, res) => {
  console.log("Server up and running at port 3000");
});
