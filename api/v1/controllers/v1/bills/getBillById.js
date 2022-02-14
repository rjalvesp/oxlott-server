module.exports = ({ params: { id } }) =>
  require("../../../../../models/bills.model").getById(id);
