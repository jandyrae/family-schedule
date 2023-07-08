const mongoose = require("mongoose");
const { Schema } = mongoose;

const familySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
  image: { type: String },
});

module.exports = mongoose.model("Family", familySchema);
