module.exports = ({ userId }) =>
  require("../../../../../models/users.model").getById(userId);
