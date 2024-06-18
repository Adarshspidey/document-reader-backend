const Author = require("../Schema/Author");
const createAuthor = (data) => Author.create(data);

const getAuthor = async (_id) =>
  _id ? await Author.findOne({ _id }) : await Author.find();

const getByEmail = async (email) => await Author.findOne({ email });

const getDataByEmail = async (email) => {
  const author = await Author.findOne({ email });
  return author ? author : null;
};

const findAuthorById = async (id) => {
  const admin = await Author.findById(id);
  return admin ? admin : null;
};

module.exports = {
  createAuthor,
  getAuthor,
  getByEmail,
  getDataByEmail,
  findAuthorById,
};
