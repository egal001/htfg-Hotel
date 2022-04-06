"use strict"

let express = require('express')
let app = express()
let api = express.Router()
let HotelsController = require('../controllers/hotels.controller.js')
let md_auth = require('../token/auth.js')

/** ---------------------------------------------------
Métodos
---------------------------------------------------- */
api.post('/stars', HotelsController.stars)
api.post('/register', HotelsController.register)
api.post('/login', HotelsController.login)
api.post('/profile', md_auth.authentication, HotelsController.profile)
api.post('/publicprofile', HotelsController.publicprofile)
api.post('/data', md_auth.authentication, HotelsController.data)
api.get('/getimage/:image', HotelsController.getImage)
api.post('/setimage', md_auth.authentication, HotelsController.setImage)

module.exports = api
