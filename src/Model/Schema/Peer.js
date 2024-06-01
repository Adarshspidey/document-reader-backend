const mongoose = require("mongoose");
const peerSchema = new mongoose.Schema({ name: String });
module.exports = mongoose.model("Peer", peerSchema);