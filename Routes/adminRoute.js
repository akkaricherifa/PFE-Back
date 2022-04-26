const router = require('express').Router();
const adminC=require("../controllers/adminController")

router.post("/login",adminC.login)
router.post("/register",adminC.register)
router.post("/mail",adminC.sendMail)
module.exports=router;