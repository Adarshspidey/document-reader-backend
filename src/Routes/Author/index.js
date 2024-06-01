const CreateAuthor = require("./Controller/createAutor");
const GetAuthor = require("./Controller/getAuthor");
const router = require("express").Router();
router.post("/create-author", CreateAuthor);
router.get("/get-author", GetAuthor);

module.exports = router;
