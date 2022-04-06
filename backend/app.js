"use strict"

let express = require('express')
let bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.urlencoded({limit:'50mb', extended:true}))
app.use(bodyParser.json({limit:'50mb', extended:true}))

module.exports = app