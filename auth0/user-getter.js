const R = require("ramda");
const axios = require("axios");

const { AUTH0_DOMAIN: domain } = process.env;

module.exports = (token) =>
  axios
    .get(`${domain}/userinfo`, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then(R.prop("data"));
