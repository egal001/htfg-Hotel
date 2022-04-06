"use strict"

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var reservationsSchema = Schema({
	name: String,
	user: String,
	startDate: Date,
	endDate: Date,
	requirements: {
		address: {
			address:String,
			country:String,
			city:String,
			cp:String
		},
		features: {
			score:Number,
			stars:Number,
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
			wifi: {
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
		}
	}
})

module.exports = mongoose.model("Reservations" , reservationsSchema)