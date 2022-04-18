const router = require("express").Router();
const entrepriseC=require("../controllers/entrepriseController")
const EntrepriseController = require("../Controllers/entrepriseController");

router.post("/", EntrepriseController.createEntreprise);
router.get("/:id",EntrepriseController.getEntreprise);
router.get("/", EntrepriseController.getAllEntreprise);

module.exports = router;