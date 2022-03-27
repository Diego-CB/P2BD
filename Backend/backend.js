/*********************************************
 * Universidad del Valle de Guatemala
 * Sistemas y Tecnologias Web
 * Autores: 
 * 	- Diego Cordova: 20212
 * 	- Paola Contreras: 20213
 * 	- Paola de Leon: 20361
 *
 * backend.js
 * - Maneja el acceso a base de datos y Api
 *********************************************/

// Imports
const express = require('express')
const pg = require('pg')
const app = express()

// Coneccion con base de datos
const conString = "postgres://qlgumddl:HKj8KpKRdvjfoEOdZ67RloTbC5KlTPHQ@raja.db.elephantsql.com/qlgumddl" 
const client = new pg.Client(conString)

client.connect(function(err) {
	if(err) {
		return console.error('could not connect to postgres', err)
	}
	client.query('SELECT NOW() AS "theTime"', (err, result) => {
		if(err) {
			return console.error('error running query', err)
		}
		client.end();
	});
});

// Server para API
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(8000, () => {
    console.log('Corrio en 8000 :D')
})

