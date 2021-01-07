// Required Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Create our Express App
const app = express();

//Convert Data to Json
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    urlencoded: true,
  })
);

//Database Connection
mongoose.connect("mongodb://localhost:27017/mydb1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", () => console.log("Error in Connecting to the Database"));
db.on("open", () => console.log("Connecting to  Database"));

//Data Post
app.post("/sign_up", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var password = req.body.password;

  var data = {
    name: name,
    email: email,
    mobile: mobile,
    password: password,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inerted Successfully");
  });
  return res.redirect("signup_success.html");
});

//Open Form
app
  .get("/", (req, res) => {
    res.redirect("index.html");
  })
  .listen(3000);
console.log("Listening on the port 3000");
