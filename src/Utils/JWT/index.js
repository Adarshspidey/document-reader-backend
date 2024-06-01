const jwt = require("jsonwebtoken");
const generateToken = (id, type, permissions) => {
  const token = jwt.sign({ id, type, permissions }, "my_secret_key");
  return token;
};

module.exports = { generateToken };
