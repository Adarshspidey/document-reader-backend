const Author = require("../../../Model/Author");
const { comparePasswords } = require("../../../Utils/Bcrypt");
const { generateToken } = require("../../../Utils/JWT");

const Login = async (req, res) => {
  let email = req.body.email;
  let exists = await Author.getByEmail(email);
  if (!exists) {
    return res.send({ message: "Email Not Found" });
  }
  let user = await Author.getDataByEmail(email);
  let password = await comparePasswords(req.body.password, user.password);
  if (!password) {
    return res.send({ message: "Password Does not Match" });
  }
  const permissions = {
    createDocument: true,
    edit: true,
    review: true,
    approval: true,
  };

  const token = generateToken(user.id, "Author", permissions);

  res.send({ message: "Login Successful", token });
};

module.exports = Login;
