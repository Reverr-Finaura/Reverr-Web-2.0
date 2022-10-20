const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const serviceAccount = require("./reverr-25fb3-firebase-adminsdk-g8tph-68e8ca1541.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const Mentors = db.collection("Mentors");
const Message = db.collection("Message");
const Funding = db.collection("Funding");
const Newsletter = db.collection("Newsletter");
const Blogs = db.collection("Blogs");
module.exports = { Mentors, Funding, Newsletter, Message, Blogs };
