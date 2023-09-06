const { connectDB, disconnectDB } = require("../db/connection");
const WinUSer = require("../db/schemas/winnerSchema");

const create = async (req, res) => {
    const { time, moves, name } = req.body;
    await connectDB();
    
    const winnerUSer = new WinUSer({ time, moves, name });
    
    const newWinUser = await winnerUSer.save();
    await disconnectDB();
    res.json(newWinUser);
}


module.exports = { create };