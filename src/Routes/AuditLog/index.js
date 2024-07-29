const { verifyToken } = require("../../Utils/JWT");
const {GetByUserId, GetByDocumentId} = require("./Controller/getAuditLog");
const router = require("express").Router();

router.get("/user", verifyToken,GetByUserId);
router.get("/document/:id", verifyToken,GetByDocumentId);

module.exports = router;