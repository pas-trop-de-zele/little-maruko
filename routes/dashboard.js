const router = require("express").Router(),
      Sms = require("../models/sms"),
      Order = require("../models/order"),
      methodOverride = require("method-override"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      middleware = require("../middleware/middleware");

mongoose.set("useFindAndModify", false);

router.use(bodyParser.urlencoded({extended: true}));

let mailman = new Sms();

router.use(methodOverride("_method"));

router.get("/dashboard/status", (req, res) => {
    res.send(req.body);
})

router.get("/dashboard", middleware.isLoggedin, (req, res) => {
    Order.find({}, (err, allOrders) => {
        res.render("dashboard/dashboard", {orders: allOrders});
    })
})

// Confirm order is received
router.post("/dashboard/confirm", middleware.isLoggedin, (req, res) => {
    mailman.messageConfirmReceived(req.body.name, req.body.phone, () => {
        Order.findByIdAndUpdate(req.body.id, {received: true}, (err, result) => {
            if (err) {
                return console.log(err);
            }
            res.redirect("/dashboard");
        })
    });    
})

// Confirm order is ready for pick up
router.post("/dashboard/ready", middleware.isLoggedin, (req, res) => {
    mailman.messasgeReadyToPickUp(req.body.name, req.body.phone, () => {
        Order.findByIdAndUpdate(req.body.id, {ready: true}, (err, result) => {
            if (err) {
                return console.log(err);
            }
            res.redirect("/dashboard")
        })
    });
})

router.delete("/dashboard/:id", middleware.isLoggedin, (req, res) => {
    Order.findByIdAndDelete(req.params.id, (err, foundOrder) => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/dashboard");
    })
})


module.exports = router;
