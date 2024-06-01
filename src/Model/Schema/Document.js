const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Documents", documentSchema);
