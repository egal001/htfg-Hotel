
let express = require('express')
let app = express()
let api = express.Router()
let BetsController = require('../controllers/bets.controller.js')
let md_auth = require('../token/auth.js')

/** ---------------------------------------------------
Métodos
---------------------------------------------------- */
// api.post('/myhotel', BetsController.getByHotel)
api.post('/register', md_auth.authentication, BetsController.register)
api.post('/getbyreservation', md_auth.authentication, BetsController.getBetsByReservation)
api.post('/ourbets', md_auth.authentication, BetsController.getBetsByHotel)
api.post('/highest', md_auth.authentication, BetsController.getHighest)
api.post('/remove', md_auth.authentication, BetsController.remove)
api.post('/updateprice', md_auth.authentication, BetsController.updatePrice)
api.post('/getopenbyreservation', md_auth.authentication, BetsController.getOpenBetsByReservation)
api.post('/close', md_auth.authentication, BetsController.closeBet)
api.post('/getclosedbyreservation', md_auth.authentication, BetsController.closedBetsByReservation)
api.post('/findtoclose', md_auth.authentication, BetsController.findToClose)

module.exports = api