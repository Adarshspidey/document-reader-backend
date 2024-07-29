const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  action: { type: String, enum: ["login", "logout", "create_document", "edit_document", "view_document"] },
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: "Documents", required: false },
  ip: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
