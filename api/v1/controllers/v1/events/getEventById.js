module.exports = ({ params: { id } }) =>
  require("../../../../../models/events.model").getById(id);
