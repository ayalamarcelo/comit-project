const express = require('express');

const path = require('path');

const cors = require('cors');
const app = express();


const controllers = require('./server/controllers/controllers')

//middlewares

app.use(express.static(path.join(__dirname, './public')));
app.use(cors());

app.get('/', controllers.goContact);
app.get('/nosotros', (req, res) => {
    const filePath = path.join(__dirname, './public/script.html')
    res.sendFile(filePath);
});