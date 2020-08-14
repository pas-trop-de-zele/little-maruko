const mongoose = require("mongoose");
const { text } = require("body-parser");

const OrderSchema = new mongoose.Schema({
    cart: [mongoose.Schema.Types.Mixed],
    name: String,
    phone: Number,
    date: Date,
    time: String,
    total: Number,
    received: Boolean,
    ready: Boolean
})

module.exports = mongoose.model("order", OrderSchema);