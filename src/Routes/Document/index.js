const { verifyToken } = require("../../Utils/JWT");
const CreateDocument = require("./Controller/createDocument");
const GetDocument = require("./Controller/getDocument");
const { ShareDocument } = require("./Controller/shareDocument");
const UpdateDocument = require("./Controller/updateDocument");
const router = require("express").Router();
router.post("/create-document", verifyToken, CreateDocument);
router.post("/share-document", verifyToken, ShareDocument);
router.get("/get-document/:id?", verifyToken, GetDocument);
router.put("/update-document", verifyToken, UpdateDocument);

module.exports = router;
