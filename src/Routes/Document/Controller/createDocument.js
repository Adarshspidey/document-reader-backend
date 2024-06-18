const Document = require("../../../Model/Document");
const Author = require("../../../Model/Author");

const CreateDocument = async (req, res) => {
  const admin = await Author.findAuthorById(req.admin);
  if (!admin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  let { content, fileName } = req.body;
  let userList= [
    { id: req.admin, permissions: "edit" },
    // Add more users as needed
  ]
  const data = await Document.createDocument({ content, fileName, userList });
  admin.documentList.push(data._id);
  await admin.save();
  res.send({ message: "Document Created", data });
};

module.exports = CreateDocument;
