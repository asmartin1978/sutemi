const express = require('express');

//Aplicacion principal
const app = express();

//Body parser, parseo de la peticion para construir un JSON leguble
const bodyParser= require('body-parser')

//middleware para parsear la peticion con body-parser
app.use(bodyParser.urlencoded({extended: true}))

//Instanciacion del cliente de MongoDB
const MongoClient = require('mongodb').MongoClient

//Engine de templates
app.set('view engine', 'ejs')



//Mapeos

//Pagina principal
app.get('/', (req, res) => {
  db.collection('usuarios').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {usuarios: result})
  })
})



//Alta de usuarios
app.post('/usuarios', (req, res) => {
  db.collection('usuarios').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})


//Arranque
var db

//Conecto a la BD, y si ok arranco el servidor
MongoClient.connect('mongodb://sutemi:imetus@ds149954.mlab.com:49954/sutemi', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


