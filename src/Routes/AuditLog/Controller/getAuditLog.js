const AuditLog = require("../../../Model/AuditLog");
const Author = require("../../../Model/Author");

const GetByUserId = async (req, res) => {
  const admin = await Author.findAuthorById(req.admin);
  if (!admin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  const logs = await AuditLog.getAuditByAuthor(req.admin);
  res.status(200).json(logs);
};

const GetByDocumentId = async (req, res) => {
  const admin = await Author.findAuthorById(req.admin);
  if (!admin) {
    return res.status(404).json({ message: "Not Authorized" });
  }
  const documentId = req.params.id;
  const logs = await AuditLog.getAuditByDocument(documentId);
  res.status(200).json(logs);
};

module.exports = { GetByUserId, GetByDocumentId };
