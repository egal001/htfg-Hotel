"use strict"

let Users = require('../models/users.model.js')
let bcrypt = require('bcrypt-nodejs')
let token = require('../token/token.js')

let fs = require('fs')
let path = require('path')

function register(req, res) {
	var user = new Users()
	let params = req.body
	user.name = params.name
	user.surname = params.surname
	user.phone = params.phone
	user.nationality = params.nationality
	user.email = params.email
	user.photo = "placeholder.png"
	if(params.password) {
		bcrypt.hash(params.password, null, null, (error, hash) => {
			if(hash) {
				user.password = hash
				if(params.email) {
					user.save((error, savedUser) => {
						if(error) {
							return res.status(500).send({message:"Error"})
						}
						else {
							return res.status(200).send({message:"OK"})
						}
					})
				}
			}
		})
	}
}

function update(req, res) {
	let user = new Users()
	let params = req.body
	user.name = params.name
	user.surname = params.surname
	user.phone = params.phone
	user.nationality = params.nationality
	user.email = params.email
	console.log(params)
	Users.findOne({email:params.email}, (err, result) => {
		if(err) {
			return res.status(500).send('Internal Server Error')
		}
		if(params.photo) {
			result.photo = params.photo
		}
		result.name = params.name
		result.surname = params.surname
		result.phone = params.phone
		result.nationality = params.nationality
		result.save((error, updated) => {
			if(error) {
				return res.status(500).send({message: "Internal Server Error"})
			}
			return res.status(200).send({message: 'Correctly updated'})
		})
	})
}

function login(req, res) {
	var params = req.body
	var email = params.email
	var password = params.password
	console.log("Entra en login")
	Users.findOne({email: email}, (error, resin) => {
		if(error || !resin) {
			res.status(500).send("Internal server error")
		} else {
			if(resin != null) {
				bcrypt.compare(password, resin.password, function(errorin, ok) {
					if(ok) {
						res.status(200).send({token:token.createToken(resin)})
					} else {
						res.status(404).send("Can't log in")
					}
					
				})
			}
		}
	})
}

function stars(req, res) {
	res.status(200).send({number:5})
}

function profile(req, res) {
	let id = req.userToken.id
	Users.findById(id, (err, response) => {
		if(err) {
			return res.status(500).send("Internal Server Error")
		}else {
			console.log(response.photo)
			return res.status(200).send({
				id: response._id,
				name: response.name,
				surname: response.surname,
				phone: response.phone,
				email: response.email,
				nationality: response.nationality,
				photo: response.photo
			})
		}	
	})
}

function publicProfile(req, res) {

	let id = req.body.id
	console.log(id)
	Users.findById(id, (err, response) => {
		if(err) {
			return res.status(500).send("Internal Server Error")
		}else {
			if(!response) {
				return res.status(404).send({message: "Not found"})
			}
			return res.status(200).send({
				id: response._id,
				name: response.name,
				surname: response.surname,
				phone: response.phone,
				email: response.email,
				nationality: response.nationality,
				photo: response.photo
			})
		}	
	})
}

function getImage(req, res) {
	var route = 'assets/users/' + req.params.image
	fs.exists(route, (exists) => {
		if(exists) {
			res.sendFile(path.resolve(route))
		} else {
			return res.status(404).send({message: "Image cannot be found"})
		}
	})
}

function test(req, res) {
	return res.status(200).send({message:'Hola mi niño'})
}

function password(req, res) {
	
}


module.exports = {
	register,
	login,
	update, 
	stars, // Rehacer
	profile,
	publicProfile,
	getImage,
	test
}
