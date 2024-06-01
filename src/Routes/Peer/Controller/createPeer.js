const Peer = require("../../../Model/Peer");

const CreatePeer = async (req, res) => {
  let name = req.body.name;
  const data = await Author.CreatePeer({ name });
  res.send({ message: "Peer Created", data });
};

module.exports = CreatePeer;