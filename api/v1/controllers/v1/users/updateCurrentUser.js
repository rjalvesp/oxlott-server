const users = require("../../../../../models/users.model");

module.exports = ({ userId, body }) => users.update(userId, body);
