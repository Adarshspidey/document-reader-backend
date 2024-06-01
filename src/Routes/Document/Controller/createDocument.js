const Document = require("../../../Model/Document");

const CreateDocument = async (req, res) => {
  let content = req.body.content;
  const data = await Document.createDocument({ content });
  res.send({ message: "Document Created", data });
};

module.exports = CreateDocument;