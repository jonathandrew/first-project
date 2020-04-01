const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  // fighter: { type: Schema.Types.ObjectID, ref: "Fighter" }
  favorite: [
    {
      fighter: String,
      fighter_id: String
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
