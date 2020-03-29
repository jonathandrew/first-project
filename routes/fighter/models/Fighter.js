const mongoose = require("mongoose");

const fighterSchema = new mongoose.Schema({
  favorites: [
    {
      name: { type: String, trim: true },
      fighter_id: { type: String, unique: true }
    }
  ]
});

module.exports = mongoose.model("Fighter", fighterSchema);
