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
const bodyParser = require('body-parser')
const cors = require('cors')
const pg = require('pg')

// Conexion con base de datos
const conString = "postgres://qlgumddl:HKj8KpKRdvjfoEOdZ67RloTbC5KlTPHQ@raja.db.elephantsql.com/qlgumddl" 

// Server para API
const app = express()
app.use(bodyParser.json())
app.use(cors())

app.listen(8000, () => {
    console.log('Corrio en 8000 :D')
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

// Registro de nuevos usuarios

app.post('/checkNewUser', (req, res) => {

    const sql = `SELECT * FROM users WHERE username = '${req.body.username}'`
    const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)
            
            client.end()
			res.json({ 
				userExist: result.rows.length > 0
			})
		})
	})
})

app.post('/register', (req, res) => {  
		
	const sql = `
		INSERT INTO users (username, email, user_password, plan, administrador, habilitado) 
        VALUES (
            '${req.body.username}', 
            '${req.body.email}', 
            '${req.body.password}', 
            ${parseInt(req.body.plan)},
            ${req.body.admin}, 
            true
        )`
  
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)
			client.end()
			res.json({ success: true })
		})
	})
})

app.post('/login', (req, res) => {

	const sql = `SELECT * FROM users WHERE username = '${req.body.username}' AND user_password = '${req.body.password}'`
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)

			
			client.end()
			console.log(result.rows)
			res.json({
				userExist: result.rows.length > 0,
				username: result.rows
			})
		})
	})
})

app.post('/checkplan', (req, res) => {

	const sql = `SELECT * FROM users WHERE username = '${req.body.username}'`
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)

			client.end()
			console.log(sql)
			console.log(req.body.username)
			//console.log(result)

			res.json({
				userExist: result.rows.length > 0,
				username: result.rows
			})
		})
	})
})