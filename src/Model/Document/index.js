const Document = require("../Schema/Document");

const createDocument = (data) => Document.create(data);

const getDocument = async (_id) => await Document.findOne({ _id });

const updateDocument = async (document) => await document.save();

const getByAdminId = async (userList) => {
  const author = await Document.find({ _id: { $in: userList } });
  return author ? author : null;
};

const getShareDocument = async (id)=> Document.find(
  { userList: { $elemMatch: { id } } }
)

module.exports = {
  createDocument,
  getDocument,
  updateDocument,
  getByAdminId,
  getShareDocument
};
