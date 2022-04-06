"use strict"

let Resolutions = require('../models/resolutions.model.js')

function visited(req, res) {
	Resolutions.find({}, (error, response) => {
		if(error) {
			return res.status(500).send({message:"Internal Server Error"})
		}
		// Habría que filtrar aquí fechas
		return res.status(200).send(response)
	})
}

function unvisited(req, res) {
	Resolutions.find({}, (error, response) => {
		if(error) {
			return res.status(500).send({message:"Internal Server Error"})
		}
		// Habría que filtrar aquí fechas
		return res.status(200).send(response)
	})
}

function register(req, res) {
	Resolutions.insert({
		email: req.userToken.email,
		startDate ,req,body,startDate,
		endDate ,req,body,endDate,
		hotel ,req,body,hotel
	}, (err) => {
		if(err) {
			return res.status(500).send({message: 'Internal Server Error'})
		}

	})
}

module.exports = {
	visited, // untested
	unvisited, // untested
	register //untested
}