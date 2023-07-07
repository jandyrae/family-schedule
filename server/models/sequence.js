const mongoose = require("mongoose");
const { Schema } = mongoose;

const sequenceSchema = new Schema({
  maxEventId: { type: Number },
  maxMemberId: { type: Number },
  maxFamilyId: { type: Number },
});
module.exports = mongoose.model("Sequence", sequenceSchema);
