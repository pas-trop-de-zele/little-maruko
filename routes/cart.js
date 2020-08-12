const { createTestAccount } = require("nodemailer");

const router = require("express").Router(),
      Tea = require("../models/teas"),
      Cart = require("../models/cart");

// Check out
router.get("/cart/billing", (req, res) => {
    let cart = new Cart(req.session.cart);
    let teasInCart = cart.generateProducts();
    res.render("cart/billing", {teasInCart : teasInCart, cart : cart});
})

router.post("/cart/checkout", (req, res) => {
    res.send("Checkout");
})

// Add to cart route
router.get("/add-to-cart/:id", (req, res) => {
    // Retrieve product id
    let teaId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    // Find item in database through id
    Tea.findById(teaId, (err, foundTea) => {
        if (err){
            console.log(err);
        } else{
            // Add item object to cart
            cart.add(foundTea, teaId);
            // Save cart to seesion
            req.session.cart = cart;
            res.redirect("/teas");
        }
    })
})

// View cart
router.get("/show-cart", (req, res) => {
    // Use existing cart in session if there is one otherwise use blank one
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    let teasInCart = cart.generateProducts();
    res.render("cart/cart", {teasInCart : teasInCart, cart : cart});
})

// remove item off cart
router.get("/cart/:id", (req, res) => {
    let cart = new Cart(req.session.cart);
    cart.remove(req.params.id);
    req.session.cart = cart;
    res.redirect("/show-cart");
})

// update item quantity in cart
router.post("/cart/:id/updatequantity", (req, res) => {
    let cart = new Cart(req.session.cart);
    cart.updateQuantity(req.params.id, req.body.newQuantity);
    req.session.cart = cart;
    res.redirect("/show-cart");
})

module.exports = router;