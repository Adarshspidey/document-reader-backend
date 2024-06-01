const Peer = require("../Schema/Peer");
const createPeer = (data) => Peer.create(data);

module.exports = { createPeer };