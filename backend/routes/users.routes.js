
let express = require('express')
let app = express()
let api = express.Router()
let UsersController = require('../controllers/users.controller.js')
let md_auth = require('../token/auth.js')


/** ---------------------------------------------------
Métodos
---------------------------------------------------- */
api.post('/stars', md_auth.authentication, UsersController.stars)
api.post('/register', UsersController.register)
api.post('/login', UsersController.login)
api.post('/update', UsersController.update)
api.post('/profile', md_auth.authentication, UsersController.profile)
api.post('/publicprofile', md_auth.authentication, UsersController.publicProfile)
api.get('/getimage/:image', UsersController.getImage)
api.get('/test', UsersController.test)


module.exports = api
