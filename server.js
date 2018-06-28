//node modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//requiring passport and dependencies
const passport = require("passport");
const session = require("express-session");
const cookieParser = require('cookie-parser');

//run passport with local strategy
require("./config/passport")(passport);

//requiring routes
var htmlRoutes = require('./routes/htmlRoutes');
// var usersRouter = require('./routes/users');
var authRouter = require("./routes/authRoutes")(passport);


const PORT = process.env.PORT || 8000;
const app = express();

//connect to mongoDB
const mongoKey = process.env.MONGO_URI || "mongodb://localhost:27017/ServicesDB"
mongoose.connect(mongoKey, ()=>{
  console.log("connected to servicesDB")
})

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret : "thesecret",
  saveUninitialized: false,
  resave: false
}))
app.use(passport.initialize());
app.use(passport.session());

//setup routes
app.use('/', htmlRoutes);
// app.use('/users', usersRouter);
app.use("/auth", authRouter);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
