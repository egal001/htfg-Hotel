"use strict"
/**********************************************************
* API para la aplicación de hoteles del TFG
* @version 1.0.0
*
**********************************************************/
let mongoose = require('mongoose')
let app = require('./app.js')
let port = process.env.PORT || 4004
let logger = require('morgan');

mongoose.connect("mongodb://admin:admin123@ds115543.mlab.com:15543/tfg", (error, respuesta) => {
	if(error) {
		app.listen(port, () => {
			console.log("Servidor del ApiRest en http://localhost:" + port)
		})
		throw error;
	} else {
		app.listen(port, () => {
			console.log("Servidor del ApiRest en http://localhost:" + port)
		})
		console.log("La conexión a la base de datos está correcta");
	}
})

let users = require('./routes/users.routes.js')
let hotels = require('./routes/hotels.routes.js')
let reservations = require('./routes/reservations.routes.js')
let bets = require('./routes/bets.routes.js')
let closedbets = require('./routes/closedbets.routes.js')
let denegated = require('./routes/denegated.routes.js')

app.use(logger('dev'));
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
 res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
 res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
 next();
 
})

app.use('/api/v1/people/', users)
app.use('/api/v1/hotels/', hotels)
app.use('/api/v1/reservations/', reservations)
app.use('/api/v1/competition/', bets)
app.use('/api/v1/assigned/', closedbets)
app.use('/api/v1/denegations/', denegated)
