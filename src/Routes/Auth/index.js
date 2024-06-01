const Signup = require("./Controller/signup");
const Login = require("./Controller/login")
const router = require("express").Router();
router.post("/signup", Signup);
router.post("/login",Login);

module.exports = router;
