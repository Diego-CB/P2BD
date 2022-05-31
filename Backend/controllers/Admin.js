const pg = require('pg')
const conString = "postgres://qlgumddl:HKj8KpKRdvjfoEOdZ67RloTbC5KlTPHQ@raja.db.elephantsql.com/qlgumddl" 

const createAdmin = (req, res) => {
	const sql = `
		INSERT INTO users (username, email, user_password, administrador) 
        VALUES (
            '${req.body.username}', 
            '${req.body.email}', 
            '${req.body.password}', 
            true
        )`
  
	const client = new pg.Client(conString)
	client.connect((err) => client.query(sql, (err, result) => {
		client.end()

		if(err) return res.json({ 
			error: err,
			success: false
		})

		res.json({ success: true })
	}))
}

module.exports = {
	createAdmin
}