var express = require("express");
var app = express();
var path = require("path");
const cors = require("cors");
const bodyparser = require("body-parser");
const { Mentors, Funding, Newsletter, Message } = require("./config");
var SibApiV3Sdk = require("sib-api-v3-sdk");

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

function Email(user) {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey =
    "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";

  // console.log(apiKey.apiKey);
  const transEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  const sender = {
    email: "noreply@reverrapp.com",
    name: "Reverr",
  };
  const receiver = [
    {
      email: user.email,
    },
  ];
  transEmailApi
    .sendTransacEmail({
      sender,
      to: receiver,
      subject: user.subject,
      htmlContent: user.text,
    })
    .then(console.log)
    .catch(console.log);
}

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/contactus", function (req, res) {
  res.render("contact", { successful: false });
});

app.post("/contactus", async function (req, res) {
  const message = req.body;

  try {
    await Message.add(message);
    const user = {
      email: req.body.email,
      subject: req.body.subject,
      text: `<h1>Thanks for being Awesome!</h1>
          <p>Hi ${
            req.body.fname + " " + req.body.lname
          }, We have received your message to ${
        req.body.subject
      } and would like to thank you for writing to us. </p>
          <p>We will contact you shortly.</p>
          <br>
          <p>Regards</p>
          <p>Team Reverr</p>`,
    };

    Email(user);
    return res.render("contact", { successful: true });
  } catch (err) {
    return res.json(err.message);
  }
});

app.get("/knowledge", function (req, res) {
  res.render("knowledge");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/community", function (req, res) {
  res.render("community");
});

app.get("/networking", function (req, res) {
  res.render("networking");
});

app.get("/funding", function (req, res) {
  res.render("funding");
});

app.get("/fundingform", function (req, res) {
  res.render("fundingform");
});

app.get("/blog", function (req, res) {
  res.render("blog");
});

app.get("/mentorship", function (req, res) {
  res.render("mentorship");
});

app.get("/test", function (req, res) {
  res.render("test");
});

app.get("/newsletter", function (req, res) {
  res.render("newsletter");
});

app.get("/mentorform", (req, res) => {
  res.render("mentorform", { successful: false });
});

app.post("/newsletter", async (req, res) => {
  const newsletter = req.body;
  try {
    await Newsletter.add(newsletter);
    return res.redirect("/");
  } catch (err) {
    return res.json({ err });
  }
});

app.post("/mentor", async (req, res) => {
  const mentor = req.body;
  try {
    await Mentors.add(mentor);
    const user = {
      email: req.body.email,
      subject: "Signup Request",
      text: `<h1>Thanks for being Awesome!</h1>
          <p>Hi ${req.body.name}, We have received your message to sign up as a mentor and would like to thank you for writing to us. </p>
          <p>We will contact you shortly.</p>
          <br>
          <p>Regards</p>
          <p>Team Reverr</p>`,
    };

    Email(user);

    const user2 = {
      email: "deepak@reverrapp.com",
      subject: "Mentor Signup Request",
      text: `<h1>${req.body.name} has joinned Reverr as mentor!</h1>
          <p>email : ${req.body.email} </p>
          <p>phone : ${req.body.mobile} </p>
          <br>
          <p>Regards</p>
          <p>Team Reverr</p>`,
    };

    Email(user2);

    const user3 = {
      email: "bdreverr@gmail.com",
      subject: "Mentor Signup Request",
      text: `<h1>${req.body.name} has joinned Reverr as mentor!</h1>
          <p>email : ${req.body.email} </p>
          <p>phone : ${req.body.mobile} </p>
          <p>linkedin : ${req.body.linkedin} </p>
          <p>gender : ${req.body.gender} </p>
          <p>DOB : ${req.body.dob} </p>
          <p>industry : ${req.body.industry} </p>
          <p>domain : ${req.body.domain} </p>
          <p>designation : ${req.body.designation} </p>
          <p>college UG : ${req.body.college} </p>
          <p>degree UG : ${req.body.degree} </p>
          <p>passout UG : ${req.body.passout} </p>
          <p>PGcollege : ${req.body.PGcollege} </p>
          <p>PGdegree : ${req.body.PGdegree} </p>
          <p>PGpassout : ${req.body.PGpassout} </p>
          <p>About : ${req.body.bio} </p>
          <p>IntroSession:${req.body.introSession} </p>
          <p>HalfSession :${req.body.halfSession} </p>
          <p>Refund :${req.body.refund} </p>
          <p>Per Hour Charges:${req.body.perHrCharges} </p>
          <p>Packages:${req.body.packages} </p>
          <br>
          <p>Regards</p>
          <p>Team Reverr</p>`,
    };

    Email(user3);

    return res.render("mentorform", { successful: true });
  } catch (err) {
    return res.json({ err });
  }
});

app.post("/funding", async (req, res) => {
  const funding = req.body;
  console.log(funding);
  try {
    await Funding.add(funding);

    const user = {
      email: req.body.Email,
      subject: "Applied for Funding",
      text: `<h1>You have successfully Applied for funding!</h1>
          <p>Hi ${req.body.name}, We have received your request and would like to thank you for writing to us. </p>
          <p>We will contact you shortly.</p>
          <br>
          <p>Regards</p>
          <p>Team Reverr</p>`,
    };

    Email(user);

    const user3 = {
      email: "bdreverr@gmail.com",
      subject: "Funding Signup Request",
      text: `<h1>${req.body.name} has applied for funding!</h1>
          <p>name:${req.body.name}</p>
          <p>year_est:${req.body.year_est}</p>
          <p>website:${req.body.website}</p>
          <p>Businessmodel:${req.body.Businessmodel}</p>
          <p>country:${req.body.country}</p>
          <p>state:${req.body.state}</p>
          <p>industry:${req.body.industry}</p>
          <p>sector:${req.body.sector}</p>
          <p>stage:${req.body.stage}</p>
          <p>pitchdeck:${req.body.pitchdeck}</p>
          <p>ElevatorPitch:${req.body.ElevatorPitch}</p>
          <p>demovideo:${req.body.demovideo}</p>
          <p>Entitydetail:${req.body.Entitydetail}</p>
          <p>teamsize:${req.body.teamsize}</p>
          <p>foundername:${req.body.foundername}</p>
          <p>Title:${req.body.Title}</p>
          <p>linkedin:${req.body.linkedin}</p>
          <p>contactnumber:${req.body.contactnumber}</p>
          <p>Email:${req.body.Email}</p>
          <br>
          <p>Regards</p>
          <p>Team Reverr</p>`,
    };

    Email(user3);
    return res.redirect("/");
  } catch (err) {
    return res.json(err);
  }
});

app.listen(3000, (req, res) => {
  console.log("Server up and running at port 3000");
});
