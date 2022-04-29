const router = require("express").Router();
const  multipart  =  require('connect-multiparty');


const CompetenceController = require("../Controllers/competenceController");

router.post("/", CompetenceController.createCompetence);
router.get("/", CompetenceController.getAllCompetence);
router.get("/:id", CompetenceController.getCompetence);


module.exports = router;