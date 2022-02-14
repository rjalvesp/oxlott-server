module.exports = (req) =>
  require("../../../../../models/bills.model").find({
    selector: { userId: req.userId },
  });
