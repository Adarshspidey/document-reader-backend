const AuditLog = require("../Schema/AuditLog");

const createAuditLog = (data) => AuditLog.create(data);

const getAuditByAuthor = async (userId) => {
  const audit = await AuditLog.find({ userId }).populate(
    "userId",
    "name email"
  );
  return audit ? audit : null;
};

const getAuditByDocument = async (documentId) => {
  const audit = await AuditLog.find({ documentId }).populate(
    "documentId",
    "fileName"
  );
  return audit ? audit : null;
};

module.exports = { createAuditLog, getAuditByAuthor, getAuditByDocument };
