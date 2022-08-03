const R = require("ramda");
const userModel = require("../../../../../models/users.model");
const userBalancesModel = require("../../../../../models/user-balances.model");

module.exports = ({ userId }) => {
  return userModel.getById(userId).then((user) =>
    userBalancesModel
      .find({ selector: { userId: `user:${userId}` } })
      .then(R.pathOr(0, ["data", 0, "balance"]))
      .then(R.objOf("balance"))
      .then(R.mergeDeepLeft(user))
  );
};
