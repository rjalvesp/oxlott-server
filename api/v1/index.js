const router = require("express").Router();
const ensureAuthenticated = require("./middlewares/ensure-authenticated");
const ensurePaymentServer = require("./middlewares/ensure-payment-server");
const tokenValidator = require("../../auth0/token-validator");

router.use("/assets", require("./routes/assets"));
router.use(
  "/bills",
  tokenValidator,
  ensureAuthenticated,
  require("./routes/bills")
);
router.use(
  "/events",
  tokenValidator,
  ensureAuthenticated,
  require("./routes/events")
);
router.use(
  "/event-types",
  tokenValidator,
  ensureAuthenticated,
  require("./routes/event-types")
);
router.use("/payments", ensurePaymentServer, require("./routes/payments"));
router.use(
  "/users",
  tokenValidator,
  ensureAuthenticated,
  require("./routes/users")
);

module.exports = router;
