const router = require("express").Router();
const ensureAuthenticated = require("./middlewares/ensure-authenticated");

router.use("/bills", ensureAuthenticated, require("./routes/bills"));
router.use("/events", ensureAuthenticated, require("./routes/events"));
router.use(
  "/event-types",
  ensureAuthenticated,
  require("./routes/event-types")
);
router.use("/users", ensureAuthenticated, require("./routes/users"));

module.exports = router;
