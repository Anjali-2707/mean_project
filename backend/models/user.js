//post schema-creayed by mongoose in mongodb
const mongoose = require('mongoose');
//import the plugin
const uniqueValidator = require("mongoose-unique-validator");

//blueprint of model
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

//plugin method of mongoose to connect the plugin to schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);