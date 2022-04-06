"use strict"

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var closedbetsSchema = Schema({
	reservation: String,
	hotel: String,
	price: Number
})

module.exports = mongoose.model("ClosedBets" , closedbetsSchema)