"use strict"

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var usersSchema = Schema({
	name: String,
	surname: String,
	password: String,
	email: String,
	birthday: String,
	phone: Number,
	nationality: String,
	photo: String,
	stars: Object
})
module.exports = mongoose.model("Users" , usersSchema)