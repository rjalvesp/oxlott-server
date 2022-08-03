module.exports = ({ params: { id } }) =>
  require("../../../../../models/bills.model").update(id, { claimed: true });
