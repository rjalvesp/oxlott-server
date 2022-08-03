const Joi = require("joi");
const router = require("express").Router();
const ExpressJoi = require("express-joi-validation").createValidator({});

const createBill = require("../controllers/v1/bills/createBill");
const datatableBills = require("../controllers/v1/bills/datatableBills");
const getBillsByUserId = require("../controllers/v1/bills/getBillsByUserId");
const getBillById = require("../controllers/v1/bills/getBillById");
const claimBill = require("../controllers/v1/bills/claimBill");
const markAsPaidBill = require("../controllers/v1/bills/markAsPaidBill");

const { controller: billSchema } = require("../../../schemas/bills.schema");
const query = require("../../../schemas/query.schema");
const finder = require("../../../schemas/finder.schema");
const ensureEvent = require("../middlewares/ensure-event");
const ensureBill = require("../middlewares/ensure-bill");
const ensureBillOwner = require("../middlewares/ensure-bill-owner");
const ensureAdmin = require("../middlewares/ensure-admin");

router.post(
  "/",
  ensureEvent(["body", "eventId"]),
  ExpressJoi.body(Joi.object(billSchema)),
  (req, res) => {
    createBill(req).then(({ data, errors }) => {
      if (errors) {
        res.status(403).json({ errors });
      }

      res.status(201).json(data);
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

router.post("/:id/claim", ensureBill, ensureBillOwner, (req, res) => {
  claimBill(req).then((value) => {
    res.status(200).json(value);
  });
});

router.post("/:id/pay", ensureAdmin, (req, res) => {
  markAsPaidBill(req).then((value) => {
    res.status(200).json(value);
  });
});

// router.post("/block", ExpressJoi.body(Joi.object(billBlock)), (req, res) => {
//   blockBill(req).then((value) => {
//     res.status(200).json(value);
//   });
// });

// router.post("/unblock", ExpressJoi.body(Joi.object(billBlock)), (req, res) => {
//   unblockBill(req).then((value) => {
//     res.status(200).json(value);
//   });
// });

// router.post("/validate", ExpressJoi.body(Joi.object(billBlock)), (req, res) => {
//   validateBill(req).then((value) => {
//     res.status(200).json(value);
//   });
// });

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
