// @ts-nocheck
const router = require("express").Router(),
      nodemailer = require("nodemailer");

// transport object
const mailman = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.STMPPORT,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})


// Show contact form
router.get('/contact/new', (req, res) => {
    res.render("contact/contact");
})

router.post('/contact', (req, res) => {
    const mail = {
        from: process.env.USER,
        to: process.env.USER,
        subject: `Message from customer - ${req.body.name}`,
        html: `
        <h1 class="display-5 text-center mt-5">Message from ${req.body.name}</h1>
        <form>
            <div class="form-group row justify-content-center">
                <div class="col-9">
                    <input name="name" type="text" class="form-control" value=${req.body.name}>
                </div>
            </div>
            <div class="form-group row justify-content-center">
                <div class="col-9">
                    <input name="email" type="text" class="form-control" value=${req.body.email}>
                </div>
            </div>
            <div class="form-group row justify-content-center">
                <div class="col-9">
                    <input name="phone" type="text" class="form-control" value=${req.body.phone}>
                </div>
            </div>
            <div class="form-group row justify-content-center">
                <div class="col-9">
                    <textarea name="message" class="form-control">${req.body.message}</textarea>
                </div>
            </div>
        </form>
        `
    }
    mailman.sendMail(mail, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Send customer message to ${info.messageId}`)
        res.render("contact/contactDone");
    })
})

module.exports = router;