const path = require('path');

function goContact(req, res){
    const filePath = path.join(__dirname, '../../public/index.html')
    res.sendFile(filePath);
}

module.exports = { goContact }