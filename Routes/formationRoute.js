const router = require("express").Router();


const FormationController = require("../Controllers/formationController");

router.post("/", FormationController.createFormation);
router.get("/", FormationController.getAllFormation);
router.put("/:id", FormationController.updateFormation);
router.get("/:id",FormationController.getFormation);
router.delete("/:id",FormationController.deleteFormation);

module.exports = router;