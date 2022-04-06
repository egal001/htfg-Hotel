"use strict"

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var denegatedSchema = Schema({
	hotel: String,
	reservation: String
})

module.exports = mongoose.model("Denegated", denegatedSchema)