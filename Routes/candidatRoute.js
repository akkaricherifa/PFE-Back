const router = require("express").Router();
const  multipart  =  require('connect-multiparty');

const CandidatController = require("../Controllers/candidatController");

router.post("/", CandidatController.createCandidat);
router.delete("/:id", CandidatController.deleteCandidat);
router.get("/", CandidatController.getAllCandidat);
router.post("/upload", CandidatController.uploadFile);
router.get("/:id", CandidatController.getCandidat);
module.exports = router;