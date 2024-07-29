const Document = require("../../../Model/Document");
const Author = require("../../../Model/Author");
const AuditLog = require("../../../Model/AuditLog");
const { getIP } = require("../../../Utils/GetIp");

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
  const auditLog = await AuditLog.createAuditLog({
    userId: req.admin,
    documentId: data._id,
    action: "create_document",
    ip: getIP(req),
  });
  res.send({ message: "Document Created", data });
};

module.exports = CreateDocument;
