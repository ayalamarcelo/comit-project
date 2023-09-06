const { connectDB, disconnectDB } = require("../db/connection");
const winnerUSer = require("../db/schemas/winnerSchema");

const create = async (req, res) => {
    const { time, moves, name } = req.body;
    await connectDB();
    
    const newUSer = new WinUser.winnerUser({ time, moves, name });
    
    const WinUser = await newUSer.save();
    await disconnectDB();
    res.json(winnerUSer);
}


module.exports = create;