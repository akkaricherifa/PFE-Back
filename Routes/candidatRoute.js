const router = require("express").Router();
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });

const CandidatController = require("../Controllers/candidatController");

router.post("/", CandidatController.createCandidat);
router.delete("/:id", CandidatController.deleteCandidat);
router.get("/", CandidatController.getAllCandidat);
router.get("/:id", CandidatController.getCandidat);
module.exports = router;