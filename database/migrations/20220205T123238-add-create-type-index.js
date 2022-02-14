const logger = require("../../logger");

const docs = [
  {
    _id: "_design/index:createdAt",
    language: "query",
    views: {
      createdAt: {
        map: {
          fields: {
            type: "asc",
            createdAt: "desc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "createdAt"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:frequency",
    language: "query",
    views: {
      frequency: {
        map: {
          fields: {
            type: "asc",
            frequency: "asc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "frequency"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:elements",
    language: "query",
    views: {
      elements: {
        map: {
          fields: {
            type: "asc",
            elements: "asc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "elements"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:minValue",
    language: "query",
    views: {
      minValue: {
        map: {
          fields: {
            type: "asc",
            minValue: "asc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "minValue"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:maxValue",
    language: "query",
    views: {
      maxValue: {
        map: {
          fields: {
            type: "asc",
            maxValue: "asc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "maxValue"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:defaultCost",
    language: "query",
    views: {
      defaultCost: {
        map: {
          fields: {
            type: "asc",
            defaultCost: "asc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "defaultCost"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:defaultPrize",
    language: "query",
    views: {
      defaultPrize: {
        map: {
          fields: {
            type: "asc",
            defaultPrize: "asc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "defaultPrize"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:name",
    language: "query",
    views: {
      name: {
        map: {
          fields: {
            type: "asc",
            name: "asc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "name"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:disabled",
    language: "query",
    views: {
      disabled: {
        map: {
          fields: {
            type: "asc",
            disabled: "asc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "disabled"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:from",
    language: "query",
    views: {
      from: {
        map: {
          fields: {
            type: "desc",
            from: "desc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "from"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:to",
    language: "query",
    views: {
      to: {
        map: {
          fields: {
            type: "desc",
            to: "desc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "to"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:cost",
    language: "query",
    views: {
      cost: {
        map: {
          fields: {
            type: "asc",
            cost: "desc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "cost"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:prize",
    language: "query",
    views: {
      prize: {
        map: {
          fields: {
            type: "asc",
            prize: "desc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "prize"],
          },
        },
      },
    },
  },
  {
    _id: "_design/index:winnerBill",
    language: "query",
    views: {
      prize: {
        map: {
          fields: {
            type: "asc",
            winnerBill: "desc",
          },
          partial_filter_selector: {},
        },
        reduce: "_count",
        options: {
          def: {
            fields: ["type", "winnerBill"],
          },
        },
      },
    },
  },
];

const up = async (db) => {
  return db.bulk({
    docs,
  });
};

const down = async (db) => {
  logger.info(db);
};

module.exports = {
  up,
  down,
};
