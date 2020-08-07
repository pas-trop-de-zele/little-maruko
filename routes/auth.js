// @ts-nocheck
const User = require("../models/user"),
      router = require("express").Router(),
      passport = require("passport"),
      bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

// sign up route
router.get("/register", (req, res) => {
    res.render("auth/register")
})

router.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, newUser) => {
        if (err) {
            console.log(err);
            return res.redirect("/register")
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/teas")
        })
    })
})

// sign in route
router.get("/signin", (req, res) => {
    res.render("auth/signin")
})

router.post("/signin", passport.authenticate("local", {
    successRedirect: "/teas",
    failureRedirect: "/signin"
}))

// sign out route
router.get("/signout", (req, res) => {
    req.logOut();
    res.redirect("/teas")
})

module.exports = router;