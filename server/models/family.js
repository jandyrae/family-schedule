const mongoose = require("mongoose");
const { Schema } = mongoose;

const familySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

module.exports = mongoose.model("Family", familySchema);
