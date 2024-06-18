const Document = require("../../../Model/Document");
const Author = require("../../../Model/Author");

const UpdateDocument = async (req, res) => {
  // Fetch admin
  const admin = await Author.findAuthorById(req.admin);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const documentId = req.query.id;
  const document = await Document.getDocument(documentId);
  if (!document) {
    return res.status(404).json({ message: "Document not found" });
  }

  // Check if admin has access to the document
  if (!admin.documentList.includes(documentId)) {
    return res.status(403).json({ message: "Access denied" });
  }

  // Check if the user has edit permissions
  const user = document.userList.find(
    (user) => user.id.toString() === req.admin && user.permissions === "edit"
  );
  console.log(user, "User");
  console.log(req.admin,"admin");
  console.log("permission", document.userList);
  if (!user) {
    return res.status(403).json({ message: "Edit permission denied" });
  }

  // Update the document content and updatedAt timestamp
  document.content = req.body.content;
  document.updatedAt = Date.now();

  // Save the updated document
  const updatedDocument = await Document.updateDocument(document);

  res.send({ message: "Document Updated Successfully", data: updatedDocument });
};

module.exports = UpdateDocument;
