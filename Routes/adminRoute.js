const router = require('express').Router();
const adminC=require("../controllers/adminController")

router.post("/login",adminC.login)
router.post("/register",adminC.register)
router.post("/mail",adminC.sendMail)
router.post("/denymail",adminC.sendDenyMail)
router.post("/", adminC.ajouterCompetence);
router.get("/", adminC.getAllCompetence);
router.get("/:id",adminC.getCompetence);
router.delete("/:id",adminC.deleteCompetence);
router.get("/comp/:id",adminC.getCompetenceByAdherent);
module.exports=router;