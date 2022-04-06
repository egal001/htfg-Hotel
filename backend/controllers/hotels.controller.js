"use strict"

let Hotels = require('../models/hotels.model.js')
let bcrypt = require('bcrypt-nodejs')
let token = require('../token/token.js')

let fs = require('fs')
let path = require('path')

function register(req, res) {
	let hotel = new Hotels()
	let params = req.body
	hotel.name = params.name
	hotel.features = params.requirements.features
	if(hotel.features.phone.enabled == null) hotel.features.phone.enabled = false
	if(hotel.features.phone.free == null) hotel.features.phone.free = false
	if(hotel.features.television.enabled == null) hotel.features.television.enabled = false
	if(hotel.features.television.free == null) hotel.features.television.free = false
	if(hotel.features.television.extra == null) hotel.features.television.extra = false
	if(hotel.features.television.flat == null) hotel.features.television.flat = false
	if(hotel.features.safebox.enabled == null) hotel.features.safebox.enabled = false
	if(hotel.features.safebox.enabled == null) hotel.features.safebox.enabled = false
	if(hotel.features.minibar.enabled == null) hotel.features.minibar.enabled = false
	if(hotel.features.minibar.free == null) hotel.features.minibar.free = false
	if(hotel.features.wifi.enabled == null) hotel.features.wifi.enabled = false
	if(hotel.features.wifi.free == null) hotel.features.wifi.free = false
	if(hotel.features.bath == null) hotel.features.bath = false
	if(hotel.features.shower == null) hotel.features.shower = false
	if(hotel.features.heating == null) hotel.features.heating = false
	if(hotel.features.cooling == null) hotel.features.cooling = false
	if(hotel.features.laundry == null) hotel.features.laundry = false
	if(hotel.features.garage == null) hotel.features.garage = false
	if(hotel.features.hairdresser == null) hotel.features.hairdresser = false
	if(hotel.features.gym == null) hotel.features.gym = false
	if(hotel.features.warehouse == null) hotel.features.warehouse = false
	if(hotel.features.lenceryWarehouse == null) hotel.features.lenceryWarehouse = false
	if(hotel.features.library == null) hotel.features.library = false
	if(hotel.features.spa == null) hotel.features.spa = false
	if(hotel.features.swimmingPool == null) hotel.features.swimmingPool = false
	if(hotel.features.pcRoom == null) hotel.features.pcRoom = false
	if(hotel.features.sportCenter == null) hotel.features.sportCenter = false
	if(hotel.features.playroom == null) hotel.features.playroom = false
	if(hotel.features.outterActivities == null) hotel.features.outterActivities = false

	hotel.email = params.email
	hotel.address = params.requirements.address

	hotel.imgs.slide = ['placeholder.jpg', 'placeholder.jpg', 'placeholder.jpg']
	hotel.imgs.photos = ['gal.jpg', 'gal.jpg']
	if(params.password) {
		bcrypt.hash(params.password, null, null, (error, hash) => {
			hotel.password = hash
			if(params.email) {
				hotel.save((error, savedUser) => {
					if(error) {
						res.status(500).send(error)
					}
					else {
						res.status(200).send({message:"OK"})
					}
				})
			}
		})
	}
}

function profile(req, res) {
	let id = req.userToken.id
	Hotels.findById(id, (error, response) => {
		if(error) {
			return res.status(404).send('Hotel not found')
		}
		return res.status(200).send({
			name: response.name,
			address: response.address,
			features: response.features,
			imgs: response.imgs
		})
	})
}

function publicprofile(req, res) {
	let id = req.body.id
	Hotels.findById(id, (error, response) => {
		if(error || !response) {
			console.log(id)
			return res.status(404).send('Hotel not found')
		}
		return res.status(200).send({
			name: response.name,
			address: response.address,
			features: response.features,
			imgs: response.imgs
		})
	})
}

function data(req, res) {
	let id = req.body.id
	Hotels.findById(id, (error, hotel) => {
		if(error) {
			return res.status(500).send({message: 'Internal Server Error'})
		}
		if(hotel) {
			return res.status(200).send(hotel)
		}
		return res.status(404).send({message: 'Hotel Not Found'})

	})
}

function stars(req, res) {
	res.status(200).send({number:5})
}
/**
* Devuelve todos los hoteles que cumplen con la reserva
**/
function reserves(req, res) {
	let hotel = new Hotels()
	hotel.features = req.body.features
	Hotels.find(hotel, (error, response) => {
		if(error) {
			return res.status(500).send({message: "Internal Server Error"})
		} else {
			return res.status(200).send(response)
		}
	})
}

function login(req, res) {
	var params = req.body
	var email = params.email
	var password = params.password
	Hotels.findOne({email: email}, (error, resin) => {
		if(error) {
			res.status(500).send("Internal server error")
		} else if(!params.email) {
			res.status(404).send("Hotel not found")
		} else {
			if(resin != null) {
				bcrypt.compare(password, resin.password, function(errorin, ok) {
					if(ok) {
						if(!params.token) {
							res.status(200).send({token:token.createToken(resin)})
						}
					} else {
						res.status(404).send("Can't log in")
					}
					
				})
			}
		}
	})
}

function getImage(req, res) {
	var route = 'assets/hotels/' + req.params.image
	fs.exists(route, (exists) => {
		if(exists) {
			res.sendFile(path.resolve(route))
		} else {
			return res.status(404).send({message: "Image cannot be found"})
		}
	})
}

function setImage(req, res) {
	let id =  req.userToken.id
	let option = req.body.opt
	let image = req.body.img
	Hotels.findById(id, (error, result) => {
		switch(option) {
			case 0:
			result.imgs.slide[0] = image
			break;
			case 1:
			result.imgs.slide[1] = image
			break;
			case 2:
			result.imgs.slide[2] = image
			break;
			case 3: 
			result.imgs.photos.push(image)
			break;
		}
		let nres = new Hotels(result)
		nres.save((error, updated) => {
			if(error || !updated) {
				return res.status(500).send({message: 'Internal Server Error'})
			} else {
				return res.status(200).send(updated)
			}
		})
	})
}

module.exports = {
	stars,
	register,
	profile,
	data,
	// update,
	login,
	reserves, //Untested
	getImage,
	setImage,
	publicprofile
}