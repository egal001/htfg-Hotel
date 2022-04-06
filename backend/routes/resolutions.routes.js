let express = require('express')
let app = express()
let api = express.Router()
let ResolutionsController = require('../controllers/users.controller.js')
let md_auth = require('../token/auth.js')

/** ---------------------------------------------------
Métodos
---------------------------------------------------- */
api.post('/register', md_auth.authentication, ResolutionsController.register)

module.exports = api
