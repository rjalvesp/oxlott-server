const create = require("./_modelFns/create");
const update = require("./_modelFns/update");
const getById = require("./_modelFns/getById");
const deleteById = require("./_modelFns/deleteById");
const find = require("./_modelFns/find");

module.exports =
  (db) =>
    ({ type, schema, overrideId }) => {
      return {
        ...db,
        create: create({ db, overrideId, schema, type }),

        update: update({ db, overrideId, schema, type }),

        getById: getById({ db, type }),

        delete: deleteById({ db, type }),

        find: find({ db, type }),
      };
    };
