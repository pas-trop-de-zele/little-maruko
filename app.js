const express = require("express"),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      teas = require("./routes/tea.js");

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
app.use("/", teas);

// sign in route
app.get("/user/signin", (req, res) => {
    res.render("user/signin")
})

// sign up route
app.get("/user/signup", (req, res) => {
    res.render("user/signup")
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})