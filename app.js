const express = require("express");
const mongoose = require("mongoose");

// Set up mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/LittleMaruko", { useNewUrlParser: true, useUnifiedTopology: true});

// port to run server on
const PORT = 3000

// Misellaneous setup
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define TeaSchema
const TeaSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

// Compile TeaSchema to make model
const Tea = mongoose.model('Tea', TeaSchema);

// ==================TEST DATA======================
Tea.create({
    name: 'Matcha',
    description: 'Inovative drink',
    price: 7
}, (err, new_instance) => {
    if(err){
        console.log(err)
    }      
})
// =================================================

// Landing page
app.get('/', (req, res) => {
    res.render("index");
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})