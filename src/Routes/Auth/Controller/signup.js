const Author = require("../../../Model/Author");
const { hashPassword } = require("../../../Utils/Bcrypt");

const Signup = async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let exists = await Author.getByEmail(email);
  if (exists) {
    return res.send({ message: "User Already Exist" });
  }
  let password = await hashPassword(req.body.password);
  const data = await Author.createAuthor({ name, email, password });
  res.send({ message: "User Created", data: { name, email } });
};

module.exports = Signup;
