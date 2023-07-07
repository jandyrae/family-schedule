const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: "Family", required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  image: { type: String },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("Member", memberSchema);
