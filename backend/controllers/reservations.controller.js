"use strict"

let Reservations = require('../models/reservations.model.js')
let Denegated = require('../models/denegated.model.js')

function isFull(req, res) {
	let MongoClient = require('mongodb').MongoClient
	let url = 'mongodb://localhost:27017'
	MongoClient.connect(url, (err, db) => {
		if (err) {
			res.status(500).send({
				msg: "Error interno del servidor."
			});
		}
		let dbo = db.db("tfg")
		let params = req.body
		dbo.collection('reservations').find({
			hotel: params.hotel,
			date: params.date
		}).toArray((err, result) => {

		})
	})
}

/**
 *	Devuelve todos los ids de reserva que coincidan con las características del hotel
 *
 **/
function availables(req, res) {
	let reservation = new Reservations()
	let params = req.body
	let array = []
	if (!params.features.phone.enabled) array.push({"$or": [{"requirements.features.phone.enabled": {"$exists": false}}, {"requirements.features.phone.enabled": {"$eq": false}}]})
	if (!params.features.phone.free) array.push({"$or": [{"requirements.features.phone.free": {"$exists": false}}, {"requirements.features.phone.free": {"$eq": false}} ]})
	if (!params.features.television.enabled) array.push({"$or": [{"requirements.features.television.enabled": {"$exists": false}}, {"requirements.features.television.enabled": {"$eq": false}} ]})
	if (!params.features.television.free) array.push({"$or": [{"requirements.features.television.free": {"$exists": false}}, {"requirements.features.television.free": {"$eq": false}} ]})
	if (!params.features.television.extra) array.push({"$or": [{"requirements.features.television.extra": {"$exists": false}}, {"requirements.features.television.extra": {"$eq": false}} ]})
	if (!params.features.television.flat) array.push({"$or": [{"requirements.features.television.flat": {"$exists": false}}, {"requirements.features.television.flat": {"$eq": false}} ]})
	if (!params.features.safebox.enabled) array.push({"$or": [{"requirements.features.safebox.enabled": {"$exists": false}}, {"requirements.features.safebox.enabled": {"$eq": false}} ]})
	if (!params.features.safebox.free) array.push({"$or": [{"requirements.features.safebox.free": {"$exists": false}}, {"requirements.features.safebox.free": {"$eq": false}}]})
	if (!params.features.minibar.enabled) array.push({"$or": [{"requirements.features.minibar.enabled": {"$exists": false}}, {"requirements.features.minibar.enabled": {"$eq": false}}]})
	if (!params.features.minibar.free) array.push({"$or": [{"requirements.features.minibar.free": {"$exists": false}}, {"requirements.features.minibar.free": {"$eq": false}}]})
	if (!params.features.wifi.enabled) array.push({"$or": [{"requirements.features.wifi.enabled": {"$exists": false}}, {"requirements.features.wifi.enabled": {"$eq": false}}]})
	if (!params.features.wifi.free) array.push({"$or": [{"requirements.features.wifi.free": {"$exists": false}}, {"requirements.features.wifi.free": {"$eq": false}}]})
	if (!params.features.bath) array.push({"$or": [{"requirements.features.bath": {"$exists": false}}, {"requirements.features.bath": {"$eq": false}}]})
	if (!params.features.shower) array.push({"$or": [{"requirements.features.shower": {"$exists": false}}, {"requirements.features.shower": {"$eq": false}}]})
	if (!params.features.heating) array.push({"$or": [{"requirements.features.heating": {"$exists": false}}, {"requirements.features.heating": {"$eq": false}}]})
	if (!params.features.cooling) array.push({"$or": [{"requirements.features.cooling": {"$exists": false}}, {"requirements.features.cooling": {"$eq": false}}]})
	if (!params.features.laundry) array.push({"$or": [{"requirements.features.laundry": {"$exists": false}}, {"requirements.features.laundry": {"$eq": false}}]})
	if (!params.features.garage) array.push({"$or": [{"requirements.features.garage": {"$exists": false}}, {"requirements.features.garage": {"$eq": false}}]})
	if (!params.features.hairdresser) array.push({"$or": [{"requirements.features.hairdresser": {"$exists": false}}, {"requirements.features.hairdresser": {"$eq": false}}]})
	if (!params.features.gym) array.push({"$or": [{"requirements.features.gym": {"$exists": false}}, {"requirements.features.gym": {"$eq": false}}]})
	if (!params.features.warehouse) array.push({"$or": [{"requirements.features.warehouse": {"$exists": false}}, {"requirements.features.warehouse": {"$eq": false}}]})
	if (!params.features.lenceryWarehouse) array.push({"$or": [{"requirements.features.lenceryWarehouse": {"$exists": false}}, {"requirements.features.lenceryWarehouse": {"$eq": false}}]})
	if (!params.features.library) array.push({"$or": [{"requirements.features.library": {"$exists": false}}, {"requirements.features.library": {"$eq": false}}]})
	if (!params.features.spa) array.push({"$or": [{"requirements.features.spa": {"$exists": false}}, {"requirements.features.spa": {"$eq": false}}]})
	if (!params.features.swimmingPool) array.push({"$or": [{"requirements.features.swimmingPool": {"$exists": false}}, {"requirements.features.swimmingPool": {"$eq": false}}]})
	if (!params.features.pcRoom) array.push({"$or": [{"requirements.features.pcRoom": {"$exists": false}}, {"requirements.features.pcRoom": {"$eq": false}}]})
	if (!params.features.sportCenter) array.push({"$or": [{"requirements.features.sportCenter": {"$exists": false}}, {"requirements.features.sportCenter": {"$eq": false}}]})
	if (!params.features.playroom) array.push({"$or": [{"requirements.features.playroom": {"$exists": false}}, {"requirements.features.playroom": {"$eq": false}}]})
	if (!params.features.outterActivities) array.push({"$or": [{"requirements.features.outterActivities": {"$exists": false}}, {"requirements.features.outterActivities": {"$eq": false}}]})
	if(array.length < 1) { 
		Reservations.find({}, (error, docs) => {
			if (error) {
				console.log(error)
				return res.status(500).send({message: "Internal Server Error"})
			} else {
				let filtered = []
				for(let i of docs) {
					Denegated.find({reservation:i._id, hotel:req.userToken.id}, (errorer, docser) => {
						if(errorer || !docser) return res.status(500).send({Message:'Internal Server Error'})
							else if(docser.length < 1) {
								filtered.push(i)
								if(i == docs[docs.length - 1]) return res.status(200).send(filtered)
							} else if(i == docs[docs.length - 1]) return res.status(200).send(filtered)
					})
				}
				if(docs.length < 1) return res.status(200).send([])
			}
		})
	} else {
		Reservations.find().and(array).exec((error, docs) => {
			if (error) {
				console.log(error)
				return res.status(500).send({message: "Internal Server Error"})
			} else {
				let filtered = []
				for(let i of docs) {
					Denegated.find({reservation:i._id, hotel:req.userToken.id}, (errorer, docser) => {
						if(errorer || !docser) return res.status(500).send({Message:'Internal Server Error'})
							else if(docser.length < 1) {
								console.log("Negamos " + i._id + " en " + req.body._id)
								filtered.push(i)
								if(i == docs[docs.length - 1]) return res.status(200).send(filtered)
							} else if(i == docs[docs.length - 1]) return res.status(200).send(filtered)
					})
				}
				if(docs.length < 1) return res.status(200).send([])
			}
		})
	}
}
/**
* Devuelve todas las reservas del usuario
*
**/
function myreservations(req, res) {
	let id = req.userToken.id
	Reservations.find({user: id}, (e, docs) => {
		if (e) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send(docs)
		}
	})
}
/**
* Borra las reservas (el usuario cambia de opinión)
*
**/
function remove(req, res) {
	Reservations.findOne({_id: req.body.id}, (err, element) => {
		if (err) {
			return res.status(404).send({message: "Item not found"})
		} else {
			element.remove((error, deleted) => {
				if (error) {
					return res.status(500).send({message: "Internal Server Error"})
				} else {
					return res.status(200).send({message: "OK"})
				}
			})
		}
	})
}
/**
 * Genera una reserva
 *
 **/
function reserve(req, res) {
	let id = req.userToken.id
	let reservation = new Reservations()
	let params = req.body
	reservation.name = params.name
	reservation.user = id 
	reservation.startDate = params.startDate
	reservation.endDate = params.endDate 
	reservation.requirements.address.address = params.requirements.address.address 
	reservation.requirements.address.country = params.requirements.address.country 
	reservation.requirements.address.community = params.requirements.address.community 
	reservation.requirements.address.city = params.requirements.address.city 
	reservation.requirements.address.cp = params.requirements.address.cp 
	reservation.requirements.features.score = params.requirements.features.score 
	reservation.requirements.features.stars = params.requirements.features.stars 
	reservation.requirements.features.phone.enabled = params.requirements.features.phone.enabled
	reservation.requirements.features.phone.free = params.requirements.features.phone.free 
	reservation.requirements.features.television.enabled = params.requirements.features.television.enabled 
	reservation.requirements.features.television.free = params.requirements.features.television.free 
	reservation.requirements.features.television.extra = params.requirements.features.television.extra 
	reservation.requirements.features.television.flat = params.requirements.features.television.flat 
	reservation.requirements.features.safebox.enabled = params.requirements.features.safebox.enabled 
	reservation.requirements.features.safebox.free = params.requirements.features.safebox.free 
	reservation.requirements.features.minibar.enabled = params.requirements.features.minibar.enabled 
	reservation.requirements.features.minibar.free = params.requirements.features.minibar.free 
	reservation.requirements.features.wifi.enabled = params.requirements.features.wifi.enabled 
	reservation.requirements.features.wifi.free = params.requirements.features.wifi.free 
	reservation.requirements.features.bath = params.requirements.features.bath 
	reservation.requirements.features.shower = params.requirements.features.shower 
	reservation.requirements.features.heating = params.requirements.features.heating 
	reservation.requirements.features.cooling = params.requirements.features.cooling 
	reservation.requirements.features.laundry = params.requirements.features.laundry 
	reservation.requirements.features.garage = params.requirements.features.garage 
	reservation.requirements.features.hairdresser = params.requirements.features.hairdresser 
	reservation.requirements.features.gym = params.requirements.features.gym 
	reservation.requirements.features.warehouse = params.requirements.features.warehouse 
	reservation.requirements.features.lenceryWarehouse = params.requirements.features.lenceryWarehouse 
	reservation.requirements.features.library = params.requirements.features.library 
	reservation.requirements.features.spa = params.requirements.features.spa 
	reservation.requirements.features.swimmingPool = params.requirements.features.swimmingPool 
	reservation.requirements.features.pcRoom = params.requirements.features.pcRoom 
	reservation.requirements.features.sportCenter = params.requirements.features.sportCenter 
	reservation.requirements.features.playroom = params.requirements.features.playroom 
	reservation.requirements.features.outterActivities = params.requirements.features.outterActivities 
	reservation.save((error, savedReservation) => {
		if (error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send({message: "OK"})
		}
	})
}

function getReservation(req, res) {
	Reservations.findOne({_id:req.body.id}, (e, docs) => {
		if(e) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send(docs)
		}
	})
}

function getUnanswered(req, res) {
	let user = req.userToken.id
	Reservations.findOne({user:user}, (e, docs) => {
		if(e || !docs) {
			// Falta
		} else {
			
		}
	})
}

module.exports = {
	// isFull, // Rehacer
	availables,
	myreservations,
	remove, // Untested
	reserve,
	getReservation
}