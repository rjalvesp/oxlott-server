module.exports = ({ body, params: { id } }) =>
  require("../../../../../models/event-types.model").update(id, body);
