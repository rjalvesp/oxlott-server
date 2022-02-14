module.exports = ({ params: { id } }) =>
  require("../../../../../models/users.model").getById(id);
