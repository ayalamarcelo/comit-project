const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const winnerSchema = new Schema({
  time: Number,
  moves: Number,
  name: String,
});

const winnerUser = model("winnerUser", winnerSchema);

module.exports = { winnerUser };
