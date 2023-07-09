var express = require("express");
var router = express.Router();

const sequenceGenerator = require("../sequenceGenerator");
const EventSchema = require("../models/event");

router.get("/", (req, res, next) => {
  EventSchema.find()
    .populate(['belongsTo', 'members'])
    .then((events) => {
      res.status(200).json({
        message: "Events retrieval success",
        events: events,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred (events)", error: err });
    });
});

router.get("/:id", (req, res, next) => {
  EventSchema.findOne({
    id: req.params.id,
  })
  .populate(['belongsTo', 'members'])
    .then((event) => {
      res.status(200).json({
        message: "Event retrieval success",
        event: event,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred (event)", error: err });
    });
});

router.post("/", (req, res, next) => {
  const maxEventId = sequenceGenerator.nextId("events");
  const event = new EventSchema({
    id: maxEventId,
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    duration: req.body.duration,
    location: req.body.location,
    details: req.body.details,
    belongsTo: req.body.belongsTo,
    members: req.body.members,
  });
  event
    .save()
    .then((newEvent) => {
      res.status(201).json({
        message: "Event added successfully",
        event: newEvent,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred saving the event",
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  EventSchema.findOne({
    id: req.params.id,
  })
    .then((event) => {
      event.name = req.body.name;
      event.date = req.body.date;
      event.time = req.body.time;
      event.duration = req.body.duration;
      event.location = req.body.location;
      event.details = req.body.details;
      event.belongsTo = req.body.belongsTo;
      event.members = req.body.members;

      EventSchema.updateOne({ id: req.params.id }, event)
        .then(() => {
          res.status(204).json({
            message: "Event updated successfully",

          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred - event",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Event not found.",
        error: { event: "Event not found", error },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  EventSchema.findOne({
    id: req.params.id,
  })
    .then(() => {
      EventSchema.deleteOne({ id: req.params.id })
        .then(() => {
          res.status(204).json({
            message: "Event deleted successfully.",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred.",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Event not found to delete",
        error: { event: "Event not found for deletion" + error },
      });
    });
});

module.exports = router;
