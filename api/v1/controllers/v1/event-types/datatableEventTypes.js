module.exports = ({ body }) =>
  require("../../../../../models/event-types.model").find(body);
