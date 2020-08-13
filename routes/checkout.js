const router = require("express").Router(),
      Order = require("../models/order"),
      Cart = require("../models/cart"),
      bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

router.post("/checkout", (req, res) => {
    let cart = new Cart(req.session.cart);
    Order.create({
        cart: cart.generateProducts(),
        name: req.body.name,
        phone: req.body.phone,
        date: req.body.date,
        time: req.body.time,
        total: cart.totalPrice
    }, (err, newOrder) => {
        if (err) {
            return console.log(err);
        }
        cart.clearAll();
        req.session.cart = cart;
        res.render("cart/checkoutDone");
    })
})

module.exports = router;