const router = require("express").Router();
const Joi = require("joi");
const ExpressJoi = require("express-joi-validation").createValidator({});

const query = require("../../../schemas/query.schema");
const finder = require("../../../schemas/finder.schema");
const {
  controller: eventTypeSchema,
} = require("../../../schemas/event-types.schema");

const createEventType = require("../controllers/v1/event-types/createEventType");
const datatableEventTypes = require("../controllers/v1/event-types/datatableEventTypes");
const getAllEventTypes = require("../controllers/v1/event-types/getAllEventTypes");
const getEventTypeById = require("../controllers/v1/event-types/getEventTypeById");
const updateEventTypeById = require("../controllers/v1/event-types/updateEventTypeById");
const ensureAdmin = require("../middlewares/ensure-admin");

router.get("/", ExpressJoi.query(Joi.object(query)), (req, res) => {
  getAllEventTypes(req).then((value) => {
    res.status(200).json(value);
  });
});

router.post(
  "/datatable",
  ensureAdmin,
  ExpressJoi.body(Joi.object(finder)),
  (req, res) => {
    datatableEventTypes(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

router.get("/:id", ensureAdmin, (req, res) => {
  getEventTypeById(req).then((value) => {
    res.status(200).json(value);
  });
});

router.post(
  "/",
  ensureAdmin,
  ExpressJoi.body(Joi.object(eventTypeSchema)),
  (req, res) => {
    createEventType(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

router.put(
  "/:id",
  ensureAdmin,
  ExpressJoi.body(Joi.object(eventTypeSchema)),
  (req, res) => {
    updateEventTypeById(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

module.exports = router;
