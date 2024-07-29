const Author = require("../../../Model/Author");

const CreateAuthor = async (req, res) => {
  let name = req.body.name;
  const data = await Author.createAuthor({ name });
  
  res.send({ message: "Author Created", data });
};

module.exports = CreateAuthor;
