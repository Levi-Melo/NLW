const express = require("express")
const server = express()

//pegar o bd
const db = require("./database/db.js")


//configurar pasta publica
server.use(express.static("public"))

//habilitar req.body
server.use(express.urlencoded({ extended: true }))


//ultilizando tamplete engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})
// configurar caminhos
//pag inicial
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Seu marketplace de coleta de resíduos" })
})
//create
server.get("/create-point", (req, res) => {

  return res.render("create-point.html",)
})

server.post("/savepoint", (req, res) => {

  const query = `
              INSERT INTO places (
                  image,
                  name,
                  address,
                  address2,
                  state,
                  city,
                  items
              ) VALUES (?,?,?,?,?,?,?);
          `
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      return console.log(err)
    }
    console.log("Cadastrado com sucesso")
    console.log(this)
    return res.render("create-point.html", { saved: true })
  }
  db.run(query, values, afterInsertData)

})





//search
server.get("/search", (req, res) => {
  const search = req.query.search
  if (search == "") {
    return res.render("search-results.html", { total: 0 })
  }
  //pegar os dados
  db.all(`SELECT * FROM places WHERE city LIKE '${search}'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    const total = rows.length
    //mostrar  a pagina html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total })
  })

})

server.get("/all-points", (req, res) => {
  // Seleciona todos os dados

  const search = req.query.city

  if (search == "") {
      return res.render("search-results.html", { total: 0 })
  }

  db.all(`SELECT * FROM places`, function(err, rows) {
      if (err) {
          return console.log(err)
      }
      
      const total = rows.length

      // Página html com os dados do database
      return res.render("search-results.html", { places: rows, total })
  })
})




//ligar o servidor
server.listen(3000)