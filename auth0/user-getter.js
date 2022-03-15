const R = require("ramda");
const axios = require("axios");

const { AUTH0_DOMAIN: domain } = process.env;

const pseudoCache = {};

module.exports = (token, user) => {
  if (pseudoCache[token]) {
    return Promise.resolve(pseudoCache[token]);
  }

  return axios
    .get(`${domain}/userinfo`, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then(R.prop("data"))
    .then((data) => {
      pseudoCache[token] = data;
      setTimeout(() => delete pseudoCache[token], user.exp);
      return data;
    });
};
