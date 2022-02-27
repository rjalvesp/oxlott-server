const Joi = require("joi");
const router = require("express").Router();
const ExpressJoi = require("express-joi-validation").createValidator({});

const query = require("../../../schemas/query.schema");
const finder = require("../../../schemas/finder.schema");
const { controller: eventSchema } = require("../../../schemas/events.schema");

const ensureEventType = require("../middlewares/ensure-event-type");

const createEvent = require("../controllers/v1/events/createEvent");
const datatableEvents = require("../controllers/v1/events/datatableEvents");
const getAllEvents = require("../controllers/v1/events/getAllEvents");
const getEventById = require("../controllers/v1/events/getEventById");
const getEventBillsById = require("../controllers/v1/events/getEventBillsById");
const updateEventById = require("../controllers/v1/events/updateEventById");
const ensureAdmin = require("../middlewares/ensure-admin");

router.get("/", ExpressJoi.query(Joi.object(query)), (req, res) => {
  getAllEvents(req).then((value) => {
    res.status(200).json(value);
  });
});

router.post(
  "/datatable",
  ensureAdmin,
  ExpressJoi.body(Joi.object(finder)),
  (req, res) => {
    datatableEvents(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

router.get("/:id", (req, res) => {
  getEventById(req).then((value) => {
    res.status(200).json(value);
  });
});

router.get("/:id/bills", (req, res) => {
  getEventBillsById(req).then((value) => {
    res.status(200).json(value);
  });
});

router.post(
  "/",
  ensureAdmin,
  ExpressJoi.body(Joi.object(eventSchema)),
  ensureEventType(["body", "eventTypeId"]),
  (req, res) => {
    createEvent(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

router.put(
  "/:id",
  ensureAdmin,
  ExpressJoi.body(Joi.object(eventSchema)),
  ensureEventType(["body", "eventTypeId"]),
  (req, res) => {
    updateEventById(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

module.exports = router;
