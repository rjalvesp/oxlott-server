module.exports = ({ params: { id } }) =>
  require("../../../../../models/event-types.model").getById(id);
