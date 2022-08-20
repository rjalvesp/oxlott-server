const Joi = require("joi");
const tokenValidator = require("../../../auth0/token-validator");
const router = require("express").Router();
const ExpressJoi = require("express-joi-validation").createValidator({});

const finder = require("../../../schemas/finder.schema");

const chargePaymentToUserId = require("../controllers/v1/payments/chargePaymentToUserId");
const datatablePayments = require("../controllers/v1/payments/datatablePayments");
const getPaymentById = require("../controllers/v1/payments/getPaymentById");
const ensureAdmin = require("../middlewares/ensure-admin");
const ensureAuthenticated = require("../middlewares/ensure-authenticated");
const ensurePayment = require("../middlewares/ensure-payment");
const ensurePaymentServer = require("../middlewares/ensure-payment-server");

router.get(
  "/:id/charge",
  ensurePaymentServer,
  ensurePayment(["params", "id"]),
  (req, res) => {
    chargePaymentToUserId(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

router.post(
  "/datatable",
  tokenValidator,
  ensureAuthenticated,
  ensureAdmin,
  ExpressJoi.body(Joi.object(finder)),
  (req, res) => {
    datatablePayments(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

router.get(
  "/:id",
  tokenValidator,
  ensureAuthenticated,
  ensureAdmin,
  (req, res) => {
    getPaymentById(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

module.exports = router;
