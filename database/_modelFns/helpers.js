const R = require("ramda");

const fixId = (type, _id) =>
  R.pipe(
    R.split(":"),
    R.ifElse(
      R.pipe(R.head, R.equals(type)),
      R.join(":"),
      R.pipe(R.last, (value) => `${type}:${value}`)
    )
  )(_id);

const getKeys = R.pipe(
  R.pick(["sort", "selector"]),
  R.over(R.lensProp("sort"), R.pipe(R.defaultTo([]), R.mergeAll, R.keys)),
  R.over(R.lensProp("selector"), R.pipe(R.defaultTo({}), R.keys)),
  R.values,
  R.flatten,
  R.uniq,
  R.reject(R.includes(R.__, ["type", "createdAt"])),
  R.sort((a, b) => (a < b ? -1 : 1))
);

const getIndexField = R.pipe(getKeys, R.join("-"), (value) => [
  `_design/index:${value}`,
  value,
]);

module.exports = {
  fixId,
  getKeys,
  getIndexField,
};
