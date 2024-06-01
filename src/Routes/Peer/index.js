const CreatePeer = require("./Controller/createPeer");
const router = require("express").Router();
router.post("/create-peer", CreatePeer);

module.exports = router;