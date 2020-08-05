// @ts-nocheck
const express = require("express"),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      session = require("express-session"),
      passportLocalMongoose = require("passport-local-mongoose"),
      bodyParser = require("body-parser");

// Importing models
const User = require("./models/user.js");

// Importing routes
const teas = require("./routes/tea"),
      auth = require("./routes/auth")

// Set up mongoose connection
mongoose.connect("mongodb://localhost/LittleMaruko", { useNewUrlParser: true, useUnifiedTopology: true});

// port to run server on
const PORT = 3000

// Misellaneous setup
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

// Set up session
app.use(session({
    secret: "hkdlaf88345hkjdgf62sf",
    resave: false,
    saveUninitialized: false
}));

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// passport config


// Importing routes
app.use(teas);
app.use(auth);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})