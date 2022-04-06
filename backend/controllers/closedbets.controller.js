"use strict"

let ClosedBets = require('../models/closedbets.model.js')

function getByHotel(req, res) {
	ClosedBets.find({hotel:req.userToken.id}, (error, response) => {
		if(error) {
			return res.status(500).send({message: 'Internal Server Error'})
		} else {
			console.log("Dentro")
			return res.status(200).send(response)
		}
	})
}

function register(req, res) {
	let closedBet = new ClosedBets()
	console.log(req.body)
	closedBet.hotel = req.body.hotel
	closedBet.reservation = req.body.reservation
	closedBet.price = req.body.price
	closedBet.save((error, response) => {
		if(error) {
			return res.status(500).send({message:'Internal Server Error'})
		} else {
			return res.status(200).send(response)
		}
	})
}

module.exports = {
	register,
	getByHotel
}