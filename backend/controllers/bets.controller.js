"use strict"

let Bets = require('../models/bets.model.js')

function register(req, res) {
	let bet = new Bets()
	bet.hotel = req.userToken.id
	bet.reservation = req.body.reservation
	bet.price = req.body.price
	bet.closed = false
	bet.save((error, response) => {
		if(error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send({message: "OK"})
		}
	})
}

function getBetsByReservation(req, res) {

	Bets.find({reservation: req.body.reservation}, (error, response) => {
		if(error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send(response)
		}
	})
}

function closeBet(req, res) {
	Bets.update({reservation: req.body.reservation},{$set:{closed: true}} , (error, updated) => {
		if(error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send(updated)
		}
	})
}

function closedBetsByReservation(req, res) {
	Bets.find({reservation: req.body.reservation, closed: true}, (error, closed) => {
		if(error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send(closed)
		}
	})
}

function findToClose(req, res) {
	Bets.find({reservation: req.body.reservation, hotel: req.body.hotel}, (error, found) => {
		if(error) {
			return res.status(500).send({message: 'Internal Server Error'})
		} else {
			return res.status(200).send(found)
		}
	})
}

/**
* Devuelves las bets abiertas para un hotel
**/
function getBetsByHotel(req, res) {
	Bets.find({hotel: req.userToken.id, closed:false}, (error, response) => {
		if(error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send(response)
		}
	})
}

/**
* Devuelve la bet con el precio más bajo
**/
function getHighest(req, res) {
	Bets.find({reservation: req.body.reservation}, (error, response) => {
		if(error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			if(response.length == 0) {
				return res.status(404).send({message: "Bet not found"})
			} else {
				let max = Number.MAX_VALUE
				let maxRes = {}
				for(let i of response) {
					if(i.price < max) {
						maxRes = i
						max = i.price
					}
				}
				return res.status(200).send(maxRes)
			}
		}
	})
}

function remove(req, res) {
	Bets.deleteOne({reservation: req.body.reservation}, (error, deleted) => {
		if(error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send({message: "Bet successfully deleted"})
		}
	})
}

function updatePrice(req, res) {
	Bets.updateOne({reservation: req.body.reservation}, {$set: {price: req.body.price}}, (error, updated) => {
		if(error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send(updated)
		}
	})
}

function getOpenBetsByReservation(req, res) {
	Bets.find({reservation: req.body.reservation, closed: false}, (error, bets) => {
		if(error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send(bets)
		}
	})
}

module.exports = {
	register,
	getBetsByReservation,
	getBetsByHotel,
	getHighest,
	remove,
	updatePrice,
	getOpenBetsByReservation,
	closeBet,
	closedBetsByReservation,
	findToClose
}