let express = require('express')
let app = express()
let api = express.Router()
let DenegatedController = require('../controllers/denegated.controller.js')
let md_auth = require('../token/auth.js')

api.post('/register', md_auth.authentication, DenegatedController.register)
api.post('/search', md_auth.authentication, DenegatedController.search)

module.exports = api