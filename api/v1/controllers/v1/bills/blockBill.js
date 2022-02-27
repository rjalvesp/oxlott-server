const bill = require("../../../../../models/bills.model");

module.exports = ({ body: { eventId, data }, userId }) =>
  bill.block(userId, eventId, data);
