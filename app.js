
const express = require('express')
const app = express()

let connect = require("./connection.js")
let config = require("./config.js")

let mustacheExpress = require('mustache-express')

app.engine("html", mustacheExpress())

  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.send('Hello World!')

})

app.get('/calendar', (req, res) => {
  let date = new Date();
  console.log("DATE: " + date);
  console.log("params", req.query);
  res.send('Bonjour ' + req.query.prenom + ' nous sommes le ' + date + ' en plein confinement.')
})


app.get("/hello", (req, res) => {
  res.render('index', {name: "César"})
})


app.get('/todo', async (req, res) => {

  let {db_client, db_connection} = await connect()
  
  db_connection.collection('todo').find({}).toArray((err, result) => {
    if(err) return console.log(err)

    console.log('todo :', result)

    db_client.close()
    res.send(result)
   
  })
})


app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`)
})

