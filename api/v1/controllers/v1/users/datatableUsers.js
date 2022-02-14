module.exports = ({ body }) =>
  require("../../../../../models/users.model").find(body);
