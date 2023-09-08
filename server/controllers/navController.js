const path = require('path');

function goHome(req, res){
    const filePath = path.join(__dirname, '../../public/home.html')
    res.sendFile(filePath);
}

function goIndex(req, res) {
    const filePath = path.join(__dirname, '../../public/index.html')
    res.sendFile(filePath);
}


module.exports = { goHome, goIndex };