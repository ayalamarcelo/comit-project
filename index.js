const express = require('express')
const app = express()
const appJS = require('./app.js')

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/style.css')
})


const PORT = 8000
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`)
})
