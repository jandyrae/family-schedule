var express = require("express");
var router = express.Router();

const sequenceGenerator = require("../sequenceGenerator");
const MemberSchema = require("../models/member");

router.get("/", (req, res, next) => {
  MemberSchema.find()
    .populate(["belongsTo", "events"])
    .then((members) => {
      res.status(200).json({
        message: "members retrieval success",
        members: members,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred (members)", error: err });
    });
});
router.get("/:id", (req, res, next) => {
  MemberSchema.findOne({
    id: req.params.id,
  })
    .populate("belongsTo")
    .then((member) => {
      res.status(200).json({
        message: "Member retrieval success",
        member: member,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred (member)", error: err });
    });
});

router.post("/", (req, res, next) => {
  const maxMemberId = sequenceGenerator.nextId("members");
  const member = new MemberSchema({
    id: maxMemberId,
    name: req.body.name,
    belongsTo: req.body.belongsTo,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    image: req.body.image,
    events: req.body.events,
  });
  member
    .save()
    .then((newMember) => {
      res.status(201).json({
        message: "Member added successfully",
        member: newMember,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred saving the member",
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  MemberSchema.findOne({ id: req.params.id })
    .then((member) => {
      member.name = req.body.name;
      member.belongsTo = req.body.belongsTo;
      member.email = req.body.email;
      member.phone = req.body.phone;
      member.address = req.body.address;
      member.image = req.body.image;
      member.events = req.body.events;

      MemberSchema.updateOne({ id: req.params.id }, member).then((member) => {
        res.status(204).json({
          message: "Member updated successfully",
          member: member,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred updating the member",
        error: err,
      });
    });
});

module.exports = router;
