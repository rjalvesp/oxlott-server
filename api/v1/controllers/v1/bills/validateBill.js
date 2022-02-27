const bill = require("../../../../../models/bills.model");

module.exports = ({ body: { eventId, data }, userId }) =>
  bill.isBlocked(userId, eventId, data);
