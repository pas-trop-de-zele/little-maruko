// @ts-nocheck
const express = require("express"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    session = require("express-session"),
    MongoStore = require("connect-mongo")(session);
(bodyParser = require("body-parser")), (dotEnv = require("dotenv").config());

// Importing models
const User = require("./models/user.js");

// Set up mongoose connection
mongoose.connect(process.env.MONGOOSECONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// port to run server on
const PORT = process.env.PORT || 3000;

// Misellaneous setup
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/**
 * Set up session
 * Only the session id is saved in the cookie
 * Session data is save on server side
 */
app.use(
    session({
        secret: process.env.SESSIONSECRET,
        // Use existing mongoose connection
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        // set cookie expiration time to 1 hour
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
        resave: false,
        saveUninitialized: false,
    })
);

// Set up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate(User.authenticate())));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    // currentUser to check whether are is a user logged in
    res.locals.currentUser = req.user;
    //
    res.locals.session = req.session;
    next();
});

// Importing routes
const teas = require("./routes/tea"),
    auth = require("./routes/auth"),
    contact = require("./routes/contact"),
    cart = require("./routes/cart"),
    checkout = require("./routes/checkout"),
    dashboard = require("./routes/dashboard");

// Importing routes
app.use(teas);
app.use(auth);
app.use(contact);
app.use(cart);
app.use(checkout);
app.use(dashboard);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
