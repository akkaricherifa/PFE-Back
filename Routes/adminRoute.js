const router = require('express').Router();
const adminC=require("../controllers/adminController")

router.post("/login",adminC.login)
router.post("/register",adminC.register)

module.exports=router;