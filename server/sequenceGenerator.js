var Sequence = require("./models/sequence");

var maxEventId;
var maxMemberId;
var maxFamilyId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .exec()
    .then((sequence) => {
      sequenceId = sequence._id;
      maxEventId = sequence.maxEventId;
      maxMemberId = sequence.maxMemberId;
      maxFamilyId = sequence.maxFamilyId;
    })
    .catch((err) => {
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    });
}

SequenceGenerator.prototype.nextId =  function (collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "events":
      maxEventId++;
      updateObject = { maxEventId: maxEventId };
      nextId = maxEventId;
      break;
    case "members":
      maxMemberId++;
      updateObject = { maxMemberId: maxMemberId };
      nextId = maxMemberId;
      break;
    case "family":
      maxFamilyId++;
      updateObject = { maxFamilyId: maxFamilyId };
      nextId = maxFamilyId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
  .then(result => console.log(result))
  .catch((err) => {
        console.log("nextId error = ", err);
        return null;
  });

  return nextId;
};
module.exports = new SequenceGenerator();
