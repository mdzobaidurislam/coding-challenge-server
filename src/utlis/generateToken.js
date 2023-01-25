const jwt = require("jsonwebtoken");

const generateToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_KEY, {
    expiresIn: "15d",
  });
};
module.exports = generateToken;
