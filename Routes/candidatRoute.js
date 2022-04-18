const router = require("express").Router();

const CandidatController = require("../Controllers/candidatController");

router.post("/", CandidatController.createCandidat);
router.delete("/:id", CandidatController.deleteCandidat);
router.get("/", CandidatController.getAllCandidat);
router.get("/:id", CandidatController.getCandidat);
module.exports = router;