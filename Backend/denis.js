const sqlite3 = require('sqlite3').verbose()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())


const db = new sqlite3.Database('example.sqlite3', (status) => {
   console.log('db', status)
})


app.get('/', (req, res) => {
  res.send('hello world')
})

// categories
app.get('/categories', (req, res) => {
  console.log('GET categories')

  // obtener de la base de datos el listado de categorias
  const sql = "SELECT * FROM categories"
  db.all(sql, [], (err, rows) => {
     console.log('categories', rows)
     res.json(rows)
  })
})

app.post('/categories', (req, res) => {
  console.log('POST categories')

  const sql = "INSERT INTO categories (name) VALUES (?)"

  db.run(sql, [req.body.name], (err, row) => {
      res.json({ success: true})
  })
})

// products
app.get('/products', (req, res) => {
  console.log('GET products')

  // obtener de la base de datos el listado de categorias
  const sql = `
    SELECT
       p.id,
       p.name name,
       p.price,
       p.stocked,
       c.name category
    FROM products p
    INNER JOIN categories c
       ON c.id = p.category
  `
  db.all(sql, [], (err, rows) => {
     console.log('products', rows, err)
     res.json(rows)
  })
})

app.post('/products', (req, res) => {
  console.log('POST products')

  const sql = "INSERT INTO products (name, price, stocked, category) VALUES (?, ?, ?, ?)"

  db.run(sql, [req.body.name, req.body.price, req.body.stocked, req.body.category], (err, row) => {
      res.json({ success: true })
  })
})



app.listen(8000, () => {
  console.log(`Example app listening on port 8000`)
})