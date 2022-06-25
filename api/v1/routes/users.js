const Joi = require("joi");
const router = require("express").Router();
const ExpressJoi = require("express-joi-validation").createValidator({});

const datatableUsers = require("../controllers/v1/users/datatableUsers");
const getCurrentUser = require("../controllers/v1/users/getCurrentUser");
const getUserById = require("../controllers/v1/users/getUserById");
const getUserBillsById = require("../controllers/v1/users/getUserBillsById");
const ensureAdmin = require("../middlewares/ensure-admin");
const updateCurrentUser = require("../controllers/v1/users/updateCurrentUser");
const { updateController: userSchema } = require("../../../schemas/users.schema");

const finder = require("../../../schemas/finder.schema");

router.post(
  "/datatable",
  ensureAdmin,
  ExpressJoi.body(Joi.object(finder)),
  (req, res) => {
    datatableUsers(req).then((value) => {
      res.status(200).json(value);
    });
  }
);

router.get("/me", (req, res) => {
  getCurrentUser(req).then((value) => {
    res.status(200).json(value);
  });
});

router.get("/:id", ensureAdmin, (req, res) => {
  getUserById(req).then((value) => {
    res.status(200).json(value);
  });
});

router.get("/:id/bills", ensureAdmin, (req, res) => {
  getUserBillsById(req).then((value) => {
    res.status(200).json(value);
  });
});

router.put("/me", ExpressJoi.body(Joi.object(userSchema)), (req, res) => {
  updateCurrentUser(req).then((value) => {
    res.status(200).json(value);
  });
});

module.exports = router;
