const R = require("ramda");

const { getIndexField } = require("./helpers");
const logger = require("../../logger");

const count = (db, value) => {
  const limit = 1000;
  return db
    .find({ ...value, fields: ["_id"], limit })
    .then(R.pathOr(0, ["docs", "length"]))
    .then(
      R.when(R.equals(limit), () =>
        count(db, { ...value, skip: (value.skip || 0) + limit }).then(
          R.add(limit)
        )
      )
    );
};

module.exports = ({ db, type }) =>
  R.pipe(
    R.defaultTo({}),
    R.mergeDeepLeft({
      selector: { type },
    }),
    (value) =>
      R.mergeDeepLeft(
        {
          use_index: getIndexField(value),
        },
        value
      ),
    R.tap(logger.info),
    (value) =>
      db
        .find(value)
        .then(R.propOr([], "docs"))
        .then(R.objOf("data"))
        .then(R.mergeDeepLeft(R.pick(["limit", "skip"], value)))
        .then((response) =>
          count(db, { selector: { type } })
            .then((totalCounted) => (response.total = totalCounted))
            .then(() => count(db, value))
            .then((filterCounted) => {
              response.filteredTotal = filterCounted;
              return response;
            })
        )
  );
