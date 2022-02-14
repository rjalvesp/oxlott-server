const Joi = require("joi");
const router = require("express").Router();
const ExpressJoi = require("express-joi-validation").createValidator({});

const createBill = require("../controllers/v1/bills/createBill");
const datatableBills = require("../controllers/v1/bills/datatableBills");
const getBillsByUserId = require("../controllers/v1/bills/getBillsByUserId");
const getBillById = require("../controllers/v1/bills/getBillById");

const { controller: billSchema } = require("../../../schemas/bills.schema");
const query = require("../../../schemas/query.schema");
const finder = require("../../../schemas/finder.schema");
const ensureEvent = require("../middlewares/ensure-event");
const ensureAdmin = require("../middlewares/ensure-admin");

router.post(
  "/",
  ExpressJoi.body(Joi.object(billSchema)),
  ensureEvent(["body", "eventId"]),
  (req, res) => {
    createBill(req).then((value) => {
      res.status(201).json(value);
    });
  }
);

router.get("/", ExpressJoi.query(Joi.object(query)), (req, res) => {
  getBillsByUserId(req).then((value) => {
    res.status(200).json(value);
  });
});

router.get(
  "/:id",
  ensureAdmin,
  ExpressJoi.query(Joi.object(query)),
  (req, res) => {
    getBillById(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

router.post(
  "/datatable",
  ensureAdmin,
  ExpressJoi.body(Joi.object(finder)),
  (req, res) => {
    datatableBills(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

module.exports = router;
