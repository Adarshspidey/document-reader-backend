const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema({
  content: String,
  fileName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userList: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
      permissions: {
        type: String,
        enum: ["edit", "peer", "view"],
        default: "view",
      },
    },
  ],
});
module.exports = mongoose.model("Documents", documentSchema);
