module.exports = ({ body }) =>
  require("../../../../../models/payments.model").find(body);
