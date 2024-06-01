const Document = require("../../../Model/Document");

const UpdateDocument = async (req, res) => {
  const id = req.query.id;
  const data = await Document.getDocument(id);
  if (!data) {
    return res.status(404).json({ message: "Document not found" });
  }
  data.content = req.body.content;
  data.updatedAt = Date.now();
  const updatedDocument = await Document.updateDocument(data);
  res.send({ message: "Document Updated Successfully", data: updatedDocument });
};

module.exports = UpdateDocument;
