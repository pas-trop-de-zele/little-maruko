const express = require("express");
const mongoose = require("mongoose");

// Set up mongoose connection
mongoose.connect("mongodb://localhost/LittleMaruko", { useNewUrlParser: true, useUnifiedTopology: true});

// port to run server on
const PORT = 3000

// Misellaneous setup
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define TeaSchema
const TeaSchema = new mongoose.Schema({
    name: String,
    price: Number
});

// Compile TeaSchema to make model
const Tea = mongoose.model('Tea', TeaSchema);

// ==================SEEDING DATA======================
let seeds = [
    {
        name: 'Original Thai Milk Tea',
        price: 4
    },
    {
        name: 'Green Thai Milk Tea',
        price: 4
    },
    {
        name: 'Golden Milk Tea',
        price: 4
    },
]

// Delete all existing data
Tea.deleteMany({}, (err, deleted_data) => {
    if (err){
        console.log(err)
    } 
})

// Add three drink on top to database
for (let i = 0; i < seeds.length; i++){
    Tea.create({
        name: seeds[i].name,
        price: seeds[i].price
    }, (err, new_data) => {
        if (err){
            console.log(err)
        } 
    })
}
// =================================================

// Landing page
app.get('/', (req, res) => {
    res.render("index");
})

// Show all teas
app.get('/teas', (req, res) => {
    Tea.find({}, (err, teas) => {
        if (err) {
            console.log(err)
        } else {
            console.log(teas)
            res.render("teas", {teas: teas})
        }
    })
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})