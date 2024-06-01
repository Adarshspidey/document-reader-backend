const CreateDocument = require("./Controller/createDocument");
const GetDocument = require("./Controller/getDocument");
const UpdateDocument = require("./Controller/updateDocument");
const router = require("express").Router();
router.post("/create-document", CreateDocument);
router.get("/get-document", GetDocument);
router.put("/update-document", UpdateDocument);

module.exports = router;
