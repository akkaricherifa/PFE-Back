const router = require("express").Router();

const AdherentController = require("../Controllers/adherentController");

router.post("/", AdherentController.createAdherent);
router.delete("/:id", AdherentController.deleteAdherent);
router.put("/:id", AdherentController.updateAdherent);
router.get("/", AdherentController.getAllAdherent);
router.get("/:id",AdherentController.getAdherent);
module.exports = router;