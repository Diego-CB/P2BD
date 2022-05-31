const pg = require('pg')
const conString = "postgres://qlgumddl:HKj8KpKRdvjfoEOdZ67RloTbC5KlTPHQ@raja.db.elephantsql.com/qlgumddl" 
const conObj = {
  user: 'qlgumddl',
  host: 'raja.db.elephantsql.com',
  database: 'qlgumddl',
  password: 'HKj8KpKRdvjfoEOdZ67RloTbC5KlTPHQ',
  port: 5432,
}

const top5Content = (req, res) => {
  const pool = new pg.Pool(conObj)
  
  ;(async () => {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      await client.query('SET TRANSACTION INSOLATION LEVEL SERIALIZABLE')

      const fetches = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q'
      ]
      
      const queryText = `SELECT * FROM all_content_top5(
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 
        $1
      )`
      
      await client.query(queryText, [req.body.month])
      const responses = []

      for (let i = 0; i < fetches.length; i++){
        const sql = `FETCH ALL FROM ${fetches[i]}`
        const response = (await client.query(sql)).rows
        responses.push(response)
      }

      await client.query('COMMIT')

      res.json({ 
        success: true,
        tops : responses
      })
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  })().catch(e => console.error(e.stack))
}

const setFinishedMovie = (req, res) => {  
		
	const sql = `
		UPDATE movie_data
		SET watched = true
		WHERE id_content = ${req.body.content}
    AND profile = (
      SELECT id_profile 
      FROM user_profiles 
      WHERE username = '${req.body.username}' 
      AND profile = '${req.body.profile}' 
      LIMIT 1
    )
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
}

const searchReport = (req, res) => {  
	const sql = `
		INSERT INTO user_search VALUES
    ('${req.body.term}')
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
}

const Top10Terms = (req, res) => {  
	const sql = `SELECT * from top10_terms`
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
				success: true,
        terms: result.rows
			})
		})
	})

}

const Top20Movies = (req, res) => {  
  console.log('body', req.body)
  
  const sql = `
  SELECT * FROM top20movies(
    '${req.body.start}', '${req.body.end}'
  )`
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
        success: true,
        movies: result.rows
      })
    })
  })
}

const top5admins = (req, res) => {  

  const sql = `SELECT * FROM top5admins`
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
        success: true,
        admins: result.rows
      })
    })
  })
}

module.exports = {
	top5Content,
  setFinishedMovie,
  searchReport,
  Top10Terms,
  Top20Movies,
  top5admins
}