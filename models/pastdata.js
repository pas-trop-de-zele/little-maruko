const mongoose = require("mongoose");

const orderedItemsSchema = new mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, ref: "teas" },
    orderedItem: String,
    orderedQuantity: Number,
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "teas" },
});

module.exports = mongoose.model("pastdata", orderedItemsSchema);
