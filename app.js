var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home");
});

app.listen(3000, (req, res) => {
  console.log("Server up and running at port 3000");
});
