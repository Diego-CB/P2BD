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
			//console.log(result)

			res.json({
				userExist: result.rows.length > 0,
				username: result.rows
			})
		})
	})
})

// Perfiles

app.post('/profiles', (req, res) => {  
		
	const sql = `
	INSERT INTO user_profiles (username, profile, estado, habilitado) 
        VALUES (
            '${req.body.username}', 
            '${req.body.profile}', 
			false,
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

app.post('/deleteprofiles', (req, res) => {  
		
	const sql = `
	DELETE FROM user_profiles WHERE profile = '${req.body.profile}' AND username = '${req.body.username}' `
  
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

app.post('/upgrade', (req, res) => {  
		
	const sql = `UPDATE users SET plan = ${parseInt(req.body.plan)} WHERE username = '${req.body.username}'`
  
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)
			client.end()
			res.json({ success: true})
		})
	})
})

app.post('/checkprofiles', (req, res) => {

	const sql = `SELECT * FROM user_profiles WHERE username = '${req.body.username}'`
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)

			client.end()
			res.json({
				username: result.rows
			})
		})
	})
})

app.get('/movieList', (req, res) => {
	const sql = 'SELECT id_content, title, genre, CAST(release_date as TEXT) FROM contenido'
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)
			client.end()

			res.json({ list: result.rows })
		})
	})
})


app.post('/addMovie', (req, res) => {  
		
	const sql = `
		INSERT INTO contenido (title, category, genre, release_date, link, min_duration) 
        VALUES (
            '${req.body.title}', 
            ${req.body.category}, 
            '${req.body.genre}', 
            '${req.body.releaseDate}',
            '${req.body.link}', 
            ${req.body.duration}
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

app.post('/checkMovieExist', (req, res) => {  
		
	const sql = `select * from contenido WHERE id_content = ${req.body.idContent}`
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)
			client.end()
			res.json({ 
				movieExist: result.rowCount > 0
			})
		})
	})
})


app.post('/alterMovie', (req, res) => {  
		
	const sql = `
		UPDATE contenido
		SET ${req.body.category} = ${req.body.newValue}
		WHERE id_content = ${req.body.idContent}
	`
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			client.end()

			if(err) {
				console.error('error running query', err)
				res.json({ success:false})
			}
			res.json({ 
				success: true
			})
		})
	})
})

app.post('/deleteMovie', (req, res) => {  
		
	const sql = `DELETE FROM contenido WHERE id_content = ${req.body.idContent}`
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			client.end()

			if(err) {
				console.error('error running query', err)
				res.json({ success:false})
			}
			res.json({ 
				success: true
			})
		})
	})
})


app.get('/userList', (req, res) => {
	const sql = 'SELECT username, email, plan, administrador, habilitado FROM users'
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)
			client.end()

			res.json({ list: result.rows })
		})
	})
})

app.post('/alterUser', (req, res) => {  
		
	const sql = `
		UPDATE users
		SET ${req.body.category} = ${req.body.newValue}
		WHERE username = '${req.body.username}'
	`
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			client.end()

			if(err) {
				console.error('error running query', err)
				res.json({ success: false})
			}
			res.json({ 
				success: true
			})
		})
	})
})

app.post('/deleteUser', (req, res) => {  
		
	const sql = `DELETE FROM users WHERE username = '${req.body.username}'`
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			client.end()

			if(err) {
				console.error('error running query', err)
				res.json({ success:false})
			}
			res.json({ 
				success: true
			})
		})
	})
})


app.get('/profileList', (req, res) => {
	const sql = 'SELECT * FROM user_profiles'
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)
			client.end()

			res.json({ list: result.rows })
		})
	})
})

app.post('/checkProfileExist', (req, res) => {  
		
	const sql = `select * from user_profiles WHERE id_profile = ${req.body.id_perfil}`
	const client = new pg.Client(conString)

	console.log(sql)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			if(err) return console.error('error running query', err)
			client.end()
			res.json({ 
				exist: result.rowCount > 0
			})
		})
	})
})

//alterProfile
app.post('/alterProfile', (req, res) => {  
		
	const sql = `
		UPDATE user_profiles
		SET ${req.body.category} = ${req.body.newValue}
		WHERE id_profile = ${req.body.id_perfil}
	`
	const client = new pg.Client(conString)

	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			client.end()

			if(err) {
				console.error('error running query', err)
				res.json({ success: false})
			}
			res.json({ 
				success: true
			})
		})
	})
})


app.post('/deleteProfile', (req, res) => {  
		
	const sql = `DELETE FROM user_profiles WHERE id_profile = ${req.body.id_profile}`
	const client = new pg.Client(conString)

	console.log(sql)
	client.connect((err) => {
		if(err) return console.error('could not connect to postgres', err)
		
		client.query(sql, (err, result) => {
			client.end()

			if(err) {
				console.error('error running query', err)
				res.json({ success:false})
			}
			res.json({ 
				success: true
			})
		})
	})
})


