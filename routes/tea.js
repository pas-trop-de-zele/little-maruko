const router = require('express').Router();
const Tea = require("../models/teas.js");
const middleware = require("../middleware/middleware");
const Cart = require('../models/cart.js');

// Landing page
router.get('/', (req, res) => {
    res.render("index");
})

// INDEX route: show all teas
router.get('/teas', (req, res) => {
    Tea.find({}, (err, teas) => {
        if (err) {
            console.log(err)
        } else {
            res.render("teas/teas", {teas: teas})
        }
    })
})

// NEW route: form to create nezw products
router.get('/teas/new', middleware.isLoggedin, (req, res) => {
    res.render("teas/new")
})

// CREATE route: create new route from form info
router.post('/teas', middleware.isLoggedin, (req, res) => {
    Tea.create(req.body.tea, (err, newTea) => {
        if (err){
            console.log(err)
        } 
    })
    res.redirect("/teas")
})

// EDIT route: edit current product
router.get("/teas/:id/edit", middleware.isLoggedin, (req, res) => {
    Tea.findById(req.params.id, (err, foundTea) => {
        res.render("teas/edit", {tea: foundTea})
    })
})

// UPDATE route: update current product
router.put("/teas/:id", middleware.isLoggedin, (req, res) => {
    Tea.findByIdAndUpdate(req.params.id, req.body.updatedTea, (err, updated_tea) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/teas")
    })
})

// DESTROY route
router.delete("/teas/:id", middleware.isLoggedin, (req, res) => {
    Tea.findByIdAndDelete(req.params.id, (err) => {
        if (err){
            console.log(err)
        }
        res.redirect("/teas")
    })
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
router.get('/show-cart', (req, res) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    let teasInCart = cart.generateProducts();
    res.render("cart/cart", {teasInCart : teasInCart, cart : cart});''
})

module.exports = router;