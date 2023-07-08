const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date },
  time: { type: String },
  duration: { type: Date },
  location: { type: String },
  details: { type: String },
  belongsTo: { type: Schema.Types.ObjectId, ref: "Family" },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

module.exports = mongoose.model("Event", eventSchema);
