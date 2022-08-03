const userBalances = require("../../../../../models/user-balances.model");

module.exports = ({ references: { payment } }) =>
  userBalances.add(payment.userId, payment);
