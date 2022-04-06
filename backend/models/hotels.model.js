"use strict"

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var hotelsSchema = Schema({
	name: String,
	email: String,
	password: String,
	address: {
		address:String,
		country:String,
		city:String,
		cp:String
	},
	features: {
		score:Number,
		stars:Number,
		wifi:{
			enabled:Boolean,
			free:Boolean
		},
		phone:{
			enabled:Boolean,
			free:Boolean
		},
		safebox: {
			enabled:Boolean,
			free:Boolean
		},
		minibar: {
			enabled:Boolean,
			free:Boolean
		},
		bath:Boolean,
		shower:Boolean,
		heating:Boolean,
		cooling:Boolean,
		laundry:Boolean,
		garage:Boolean,
		hairdresser:Boolean,
		gym:Boolean,
		warehouse:Boolean,
		library:Boolean,
		spa:Boolean,
		swimmingPool:Boolean,
		pcRoom:Boolean,
		sportCenter:Boolean,
		playroom:Boolean,
		outterActivities:Boolean
	},
	imgs: {
		slide: Array,
		photos: Array
	}
})

module.exports = mongoose.model("Hotels" , hotelsSchema)