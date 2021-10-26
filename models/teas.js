const mongoose = require("mongoose");

// define Schema
const TeaSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    orderCount: { type: Number, default: 0 },
});

// compile TeaSchema into model
const Tea = mongoose.model("tea", TeaSchema);

module.exports = Tea;
