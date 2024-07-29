const Author = require("../../../Model/Author");
const AuditLog = require("../../../Model/AuditLog");
const { comparePasswords } = require("../../../Utils/Bcrypt");
const { generateToken } = require("../../../Utils/JWT");
const { getIP } = require("../../../Utils/GetIp");

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

  const auditLog = await AuditLog.createAuditLog({
    userId: user.id,
    action: "login",
    ip: getIP(req),
  });
  res.send({ message: "Login Successful", token });
};

module.exports = Login;
