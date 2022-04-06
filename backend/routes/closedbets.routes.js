
let express = require('express')
let app = express()
let api = express.Router()
let ClosedBetsController = require('../controllers/closedbets.controller.js')
let md_auth = require('../token/auth.js')

/** ---------------------------------------------------
Métodos
---------------------------------------------------- */
// api.post('/myhotel', BetsController.getByHotel)
api.post('/register', md_auth.authentication, ClosedBetsController.register)
api.post('/getbyhotel', md_auth.authentication, ClosedBetsController.getByHotel)

module.exports = api