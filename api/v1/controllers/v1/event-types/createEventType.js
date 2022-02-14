module.exports = ({ body }) =>
  require("../../../../../models/event-types.model").create(body);
