const router = require('express').Router();
const adminC=require("../controllers/adminController")

router.post("/login",adminC.login)
router.post("/register",adminC.register)
router.post("/mail",adminC.sendMail)
router.post("/denymail",adminC.sendDenyMail)
module.exports=router;