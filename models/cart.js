const mongoose = require("mongoose")

// Define cart schema
const CartItemSchema = new mongoose.Schema({
    productId: String
})

// Compile CartItemSchema into model
const CartItem = mongoose.model('CartItem', CartItemSchema)

module.exports = CartItem