var express = require("express");
var router = express.Router();

const sequenceGenerator = require("../sequenceGenerator");
const FamilySchema = require("../models/family");

router.get("/", (req, res, next) => {
  FamilySchema.find()
  .populate('members')
    .then((family) => {
      res.status(200).json({
        message: "all Family retrieval success",
        family: family,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred (all family)", error: err });
    });
});

router.get("/:id", (req, res, next) => {
  FamilySchema.findOne({
    id: req.params.id,
  }).populate('members')
    .then((family) => {
      res.status(200).json({
        message: "One Family retrieval success",
        family: family,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred (family)", error: err });
    });
});

router.post("/", (req, res, next) => {
  const maxFamilyId = sequenceGenerator.nextId("family");
  const family = new FamilySchema({
    id: maxFamilyId,
    name: req.body.name,
    members: req.body.members,
    image: req.body.image,
  });
  family
    .save()
    .then((newFamily) => {
      res.status(201).json({
        message: "Family added successfully",
        family: newFamily,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred (family)", error: err });
    });
});

router.put("/:id", (req, res, next) => {
  FamilySchema.findOne({
    id: req.params.id,
  })
    .then((family) => {
      // family.id = req.body.id;
      family.name = req.body.name;
      family.members = (req.body.members = null);
      family.image = req.body.image;

      FamilySchema.updateOne({ id: req.params.id }, family)
        .then(() => {
          res.status(204).json({
            message: "Family updated successfully",
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "An error occurred (update family)", error: err });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Family not found (update family)", error: err });
    });
});

router.delete("/:id", (req, res, next) => {
  FamilySchema.findOne({
    id: req.params.id,
  })
    .then(() => {
      FamilySchema.deleteOne({ id: req.params.id })
        .then(() => {
          res.status(204).json({
            message: "Family deleted successfully",
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "An error occurred (delete family)", error: err });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Family not found (delete family)", error: err });
    });
});

module.exports = router;
