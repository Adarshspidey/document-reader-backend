const Document = require("../../../Model/Document");

const GetDocument = async (req, res) => {
  const id = req.query.id;
  const data = await Document.getDocument(id);
  res.send(data);
};

module.exports = GetDocument;
