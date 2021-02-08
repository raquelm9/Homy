const jwt = require("jsonwebtoken");
const config = require('../config');

module.exports = function auth(req, res, next) {

  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, config.JWT.SECRET_KEY);
    req.user = decoded;

    next(); //pass to the next middleware function
  } catch (ex) {

    res.status(400).send({ error: "Invalid token." });
  }
};
