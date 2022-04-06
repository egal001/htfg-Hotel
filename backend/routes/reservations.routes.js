let express = require('express')
let app = express()
let api = express.Router()
let ReservationsController = require('../controllers/reservations.controller.js')
let md_auth = require('../token/auth.js')

/** ---------------------------------------------------
Métodos
---------------------------------------------------- */
api.post('/reserve', md_auth.authentication, ReservationsController.reserve)
api.post('/availables', md_auth.authentication, ReservationsController.availables)
api.post('/myreservations', md_auth.authentication, ReservationsController.myreservations)
api.post('/getreservation', md_auth.authentication, ReservationsController.getReservation)

module.exports = api
	