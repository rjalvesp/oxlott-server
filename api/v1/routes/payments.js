const router = require("express").Router();

const chargePaymentToUserId = require("../controllers/v1/payments/chargePaymentToUserId");
const ensurePayment = require("../middlewares/ensure-payment");

router.get("/:id/charge", ensurePayment(["params", "id"]), (req, res) => {
  chargePaymentToUserId(req).then((value) => {
    res.status(200).json(value);
  });
});

module.exports = router;
