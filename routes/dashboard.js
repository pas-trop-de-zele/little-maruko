const router = require("express").Router(),
      Cart = require("../models/cart"),
      Order = require("../models/order"),
      methodOverride = require("method-override");

router.use(methodOverride("_method"));

router.get("/dashboard", (req, res) => {
    Order.find({}, (err, allOrders) => {
        res.render("dashboard/dashboard", {orders: allOrders});
    })
})

router.delete("/dashboard/:id", (req, res) => {
    Order.findByIdAndDelete(req.params.id, (err, foundOrder) => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/dashboard");
    })
})

module.exports = router;
