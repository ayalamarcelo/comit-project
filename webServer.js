const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()
const PORT = 8000

// middleware
app.use(cors());

const pokeAPI = fs.readFileSync('pokeAPI.json', 'utf-8')
const pokemonArray = JSON.parse(pokeAPI)

app.get('/pokeAPI', (req, res) => {
  res.json(pokemonArray)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})