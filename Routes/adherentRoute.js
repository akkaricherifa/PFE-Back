const router = require("express").Router();

const AdherentController = require("../Controllers/adherentController");

router.post("/", AdherentController.createAdherent);
router.delete("/:id", AdherentController.deleteAdherent);
router.put("/:id", AdherentController.updateAdherent);
router.get("/", AdherentController.getAllAdherent);
router.get("/:id",AdherentController.getAdherent);
router.put("change/:id",AdherentController.changerpwdsuser);
router.post("/upload", AdherentController.uploadFile);
router.post("/a/:id", AdherentController.participer);
router.get("/get/:id",AdherentController.getAdherentByFormation);
router.post("/ajout/:id",AdherentController.ajoutCompetence2);
module.exports = router;