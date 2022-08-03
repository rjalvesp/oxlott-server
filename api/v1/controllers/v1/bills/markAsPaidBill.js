module.exports = ({ params: { id } }) =>
  require("../../../../../models/bills.model").update(id, { paid: true });
