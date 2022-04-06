"use strict"

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var betsSchema = Schema({
	reservation: String,
	hotel: String,
	price: Number,
	closed: Boolean
})

module.exports = mongoose.model("Bets" , betsSchema)
