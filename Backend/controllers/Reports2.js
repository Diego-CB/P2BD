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

module.exports = {
	top5Content
}