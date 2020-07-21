const express = require("express"),
      methodOverride = require("method-override"),
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
app.use(methodOverride("_method"))

// Define TeaSchema
const TeaSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number
});

// Compile TeaSchema to make model
const Tea = mongoose.model('Tea', TeaSchema);

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

// DESTROY route
app.delete('/teas/:id', (req, res) => {
    Tea.findByIdAndDelete(req.params.id, (err) => {
        if (err){
            console.log(err)
        }
        res.redirect("/teas")
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})