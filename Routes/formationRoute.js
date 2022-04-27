const router = require("express").Router();


const FormationController = require("../Controllers/formationController");

router.post("/", FormationController.createFormation);
router.get("/", FormationController.getAllFormation);


module.exports = router;