require('dotenv').config();
const express = require('express')
const path = require('path')
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 8000;

const navController = require('./server/controllers/navController');
const winController = require('./server/controllers/winController');

// Middleware
app.use(express.static(path.join(__dirname, './public')));
app.use(cors());
app.use(express.json());

const pokeAPI = fs.readFileSync('pokeAPI.json', 'utf-8')
const pokemonArray = JSON.parse(pokeAPI);

app.get('/pokeAPI', (req, res) => {
  res.json(pokemonArray)
});

app.get('/', navController.goIndex);
app.post('/api/winner', winController.create);

// PORT 8000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
});