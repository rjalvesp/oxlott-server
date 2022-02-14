module.exports = ({ body }) =>
  require("../../../../../models/bills.model").find(body);
