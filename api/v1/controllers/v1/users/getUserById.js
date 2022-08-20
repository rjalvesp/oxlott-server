const R = require("ramda");
const userModel = require("../../../../../models/users.model");
const userBalancesModel = require("../../../../../models/user-balances.model");

module.exports = ({ params: { id } }) =>
  userModel.getById(id).then((user) =>
    userBalancesModel
      .find({ selector: { userId: `user:${id}` } })
      .then(R.pathOr(0, ["data", 0, "balance"]))
      .then(R.objOf("balance"))
      .then(R.mergeDeepLeft(user))
  );
