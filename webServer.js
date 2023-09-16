require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT ?? 8000;

const navController = require('./server/controllers/navController');
const winController = require('./server/controllers/winController');


app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './public/src')));

app.use(cors());
app.use(express.json());

const pokeAPI = fs.readFileSync('pokeAPI.json', 'utf-8')
const pokemonArray = JSON.parse(pokeAPI);

app.get('/pokeAPI', (req, res) => {
  res.json(pokemonArray)
});

app.get('/', navController.goHome);
app.get('/index', navController.goIndex);
app.post('/api/winner', winController.create);


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});