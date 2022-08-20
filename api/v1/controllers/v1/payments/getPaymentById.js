module.exports = ({ params: { id } }) =>
  require("../../../../../models/payments.model").getById(id);
