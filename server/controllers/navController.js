const path = require('path')

function goIndex (req, res) {
    const filePath = path.join(__dirname, './public/index.html')
    res.send(filePath)
}

module.exports = { goIndex }