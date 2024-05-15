/**
 * @param {Express.Request} req
 * @returns {string}
 */
const getCurrentVersion = (req) => {
  return req.baseUrl.slice(-2);
};

module.exports = {
  getCurrentVersion,
};
