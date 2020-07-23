const express = require("express"),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      Tea = require("./models/teas")

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

// CREATE route: create new route from form info
app.post('/teas', (req, res) => {
    Tea.create(req.body.tea, (err, newTea) => {
        if (err){
            console.log(err)
        } 
    })
    res.redirect("/teas")
})

// EDIT route: edit current product
app.get("/teas/:id/edit", (req, res) => {
    Tea.findById(req.params.id, (err, foundTea) => {
        res.render("edit", {tea: foundTea})
    })
})

// UPDATE route: update current product
app.put("/teas/:id", (req, res) => {
    Tea.findByIdAndUpdate(req.params.id, req.body.updatedTea, (err, updated_tea) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/teas")
    })
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