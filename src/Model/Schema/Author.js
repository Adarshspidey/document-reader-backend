const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  documentList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Documents",
    },
  ],
});
module.exports = mongoose.model("Author", authorSchema);
