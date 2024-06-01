const Author = require("../../../Model/Author");

const GetAuthor = async (req, res) => {
  const id = req.query.id;
  const data = await Author.getAuthor(id);
  res.send(data);
};

module.exports = GetAuthor;
