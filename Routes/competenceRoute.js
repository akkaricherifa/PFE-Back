const router = require("express").Router();
const  multipart  =  require('connect-multiparty');


const CompetenceController = require("../Controllers/competenceController");

router.post("/", CompetenceController.createCompetence);
router.get("/", CompetenceController.getAllCompetence);


module.exports = router;