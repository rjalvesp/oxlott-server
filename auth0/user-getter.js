const R = require("ramda");
const axios = require("axios");
const { AUTH0_DOMAIN: domain, AUTH0_TOKEN: machineToken } = process.env;

const pseudoCache = {};

module.exports = (token, user) => {
  if (pseudoCache[token]) {
    return Promise.resolve(pseudoCache[token]);
  }
  return axios
    .get(`${domain}/api/v2/users/${user.sub}`, {
      headers: { authorization: `Bearer ${machineToken}` },
    })
    .then(R.prop("data"))
    .then((data) => {
      pseudoCache[token] = data;
      setTimeout(() => delete pseudoCache[token], user.exp);
      return data;
    });
};
