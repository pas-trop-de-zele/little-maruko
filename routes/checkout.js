const router = require("express").Router(),
      nodemailer = require("nodemailer"),
      smtpCredentials = require("../credentials/smtp"),
      Cart = require("../models/cart");

// transport object
const mailman = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: smtpCredentials.user,
        pass: smtpCredentials.pass
    }
})

router.post('/checkout', (req, res) => {
    let cart = new Cart(req.session.cart);
    let items = cart.generateProducts();
    let order = "";
    // Add pick up info
    order += `
        <h3>Customer info</h3>
        Name: ${req.body.name} <br>
        Phone: ${req.body.phone} <br>
        Pickup date: ${req.body.date} <br>
        Pickup time: ${req.body.time} <br>

        <h3>Order info</h3> </br>
    `
    // Add items
    items.forEach((item) => {
        order += `${item.item.name} - Quantity: ${item.qty} - Subtotal: $${item.price} <br>`;
    })
    order += `Total: $${cart.totalPrice}`
    // clear cart
    cart.clearAll();
    req.session.cart = cart;
    const mail = {
        from: "gulagman4157@gmail.com",
        to: "gulagman4157@gmail.com",
        subject: `NEW ORDER from  ${req.body.name}`,
        html: order
    }
    mailman.sendMail(mail, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Send order to ${info.messageId}`)
        res.render("cart/checkoutDone");
    })
})

module.exports = router;