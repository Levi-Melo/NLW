//importando dependencia do sql
const sqlite3 = require("sqlite3").verbose()

//iniciar objeto q ira fazer operações no banco de dado
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de bd para operações
// db.serialize(() => {
//     //com comandos sql:
//     //criar tabela
//     db.run(`
//          CREATE TABLE IF NOT EXISTS places (
//              id INTEGER PRIMARY KEY AUTOINCREMENT,
//              image TEXT,
//              name TEXT,
//              address TEXT,
//              address2 TEXT,
//              state TEXT,
//              city TEXT,
//              items TEXT
//          );
//      `)
//         //inserir dados
//         //os dados
//     const query = `
//              INSERT INTO places (
//                  image,
//                  name,
//                  address,
//                  address2,
//                  state,
//                  city,
//                  items
//              ) VALUES (?,?,?,?,?,?,?);
//          `
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }
//     db.run(query, values, afterInsertData)
//         //consultar os dados da tabela
//     db.all(`SELECT * FROM places`, function(err, rows) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Aqui estão seus registros")
//         console.log(rows)
//     })

    //deletar dados
//     db.run(`DELETE  FROM places`,  function(err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Registro deletado com sucesso!")
//     })
// })