const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: String , required: true},
  time: { type: String, required: true },
  duration: { type: String, required: false },
  location: { type: String },
  details: { type: String },
  belongsTo: { type: Schema.Types.ObjectId, ref: "Family" , required: true},
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

module.exports = mongoose.model("Event", eventSchema);
