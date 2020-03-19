const mongoose = require("mongoose");

const fighterSchema = new mongoose.Schema({
  name: { type: String },
  pob: { type: String },
  country: { type: String },
  dob: { type: String },
  record: {
    wins: { type: String },
    losses: { type: String },
    Draws: { type: String }
  }
});

module.exports = mongoose.model("Fighters", fighterSchema);
