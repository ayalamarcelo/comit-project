const { connectDB, disconnectDB } = require("../db/connection");
const winnerUSer = require("../db/schemas/winnerSchema");

const create = async (req, res) => {
    const { time, moves, user } = req.body;
    await connectDB();
    
    const newUSer = new winnerUSer({ time, moves, user });
    
    const WinUser = await newUSer.save();
    await disconnectDB();
    res.json(winnerUSer);
}


module.exports = { create };