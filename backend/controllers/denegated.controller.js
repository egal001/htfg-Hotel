"use strict"

let Denegations = require('../models/denegated.model.js')

function register(req, res) {
	let hotel = req.userToken.id
	let reservation = req.body.reservation

	let denegation = new Denegations()
	denegation.hotel = hotel
	denegation.reservation = reservation

	denegation.save((error, inserted) => {
		if(error || !inserted) return res.status(500).send({message: 'Internal Server Error'})
			else return res.status(200).send({message: 'Successfully saved'})
	})
}

function search(req, res) {
	let hotel = req.userToken.id
	let reservation = req.body.reservation

	Denegations.find({hotel:hotel, reservation:reservation}, (error, found) => {
		if(error) return res.status(500).send({message: 'Internal Server Error'})
		else if(!found) res.status(200).send([])
		else return res.status(200).send(found)
	})
}

module.exports = {
	register,
	search
}
