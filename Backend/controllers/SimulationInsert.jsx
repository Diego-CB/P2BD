const pg = require('pg')
const conString = "postgres://qlgumddl:HKj8KpKRdvjfoEOdZ67RloTbC5KlTPHQ@raja.db.elephantsql.com/qlgumddl" 
const conObj = {
  user: 'qlgumddl',
  host: 'raja.db.elephantsql.com',
  database: 'qlgumddl',
  password: 'HKj8KpKRdvjfoEOdZ67RloTbC5KlTPHQ',
  port: 5432,
}

const conDate = (req, res) => {
  const pool = new pg.Pool(conObj)
  
  ;(async () => {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      
      const queryText = `SELECT * FROM confecha('${req.body.n}','${req.body.d}');`
      await client.query(queryText)
   
      const sql =`SELECT * FROM movie_data WHERE started ='${req.body.d}' LIMIT '${req.body.n}';`
      await client.query(sql)
   
      await client.query('COMMIT')

    console.log('aquiii')

      res.json({ 
        success: true,
      })
    } catch (e) {
      client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  })().catch(e => console.error(e.stack))
}





module.exports ={
  conDate
}