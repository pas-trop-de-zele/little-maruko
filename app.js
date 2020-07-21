const express = require("express"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser")

// Set up mongoose connection
mongoose.connect("mongodb://localhost/LittleMaruko", { useNewUrlParser: true, useUnifiedTopology: true});

// port to run server on
const PORT = 3000

// Misellaneous setup
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Define TeaSchema
const TeaSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number
});

// Compile TeaSchema to make model
const Tea = mongoose.model('Tea', TeaSchema);

// ==================SEEDING DATA======================
let seeds = [
    {
        name: 'Matcha Milk Tea',
        image: "https://images.unsplash.com/photo-1561658286-ecb9fe9d8480?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Innovative Matcha",
        price: 4
    },
    {
        name: 'Green Thai Milk Tea',
        image: "https://images.unsplash.com/photo-1482349274213-19ca6126f02f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80",
        description: "Unmatched Thai cuisine",
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
        image: seeds[i].image,
        description: seeds[i].description,
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

// INDEX route: show all teas
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

// NEW route: form to create new products
app.get('/teas/new', (req, res) => {
    res.render("new")
})

// CREATE ROUTE: create new route from form info
app.post('/teas', (req, res) => {
    Tea.create(req.body.tea, (err, new_tea) => {
        if (err){
            console.log(err)
        } else {
            console.log(new_tea)
        }
    })
    res.redirect("/teas")
})




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})