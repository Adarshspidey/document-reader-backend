const Document = require("../../../Model/Document");
const Author = require("../../../Model/Author");
const AuditLog = require("../../../Model/AuditLog");
const { getIP } = require("../../../Utils/GetIp");

const GetDocument = async (req, res) => {
  const admin = await Author.findAuthorById(req.admin);
  if (!admin) {
    return res.status(404).json({ message: "Unauthorized" });
  }

  const userId = req.query.id;

  if (userId) {
    // Fetch specific user by ID
    if (!admin.documentList.includes(userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const data = await Document.getDocument(userId);
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    const permissions = data.userList.find(
      (user) => user.id.toString() === req.admin
    );

    const auditLog = await AuditLog.createAuditLog({
      userId: req.admin,
      documentId: data._id,
      action: "view_document",
      ip: getIP(req),
    });

    return res.status(200).json({
      data,
      permissions: permissions.permissions,
      message: "Document Find Successfully",
    });
  } else {
    // Fetch all users associated with the admin
    const data = await Document.getByAdminId(admin.documentList);
    const dataId = data.map((item) => item._id.toString());
    const share = await Document.getShareDocument(req.admin);
    const filteredShare = share.filter((item) => !dataId.includes(item._id.toString()));
    return res.status(200).json({ data, "share": filteredShare });
  }
};

module.exports = GetDocument;
