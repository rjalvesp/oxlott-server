const bill = require("../../../../../models/bills.model");

module.exports = ({ body: { eventId, data }, userId }) =>
  bill.unblock(userId, eventId, data);
