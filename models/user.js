const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true}
})

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;