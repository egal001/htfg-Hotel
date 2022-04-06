"use strict"

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var resolutionsSchema = Schema({
	email: String,
	startDate: Date,
	endDate: Date,
	hotel: String
})
module.exports = mongoose.model("Resolutions" , resolutionsSchema)