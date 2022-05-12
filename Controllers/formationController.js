const FormationModel = require("../model/formation");



createFormation = async (req, res) => {
    try {
      const newFormation = new FormationModel(req.body);
      await newFormation.save();
      res.status(201).json({
        message: "Formation created",
        data: newFormation,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

updateFormation = async (req, res) => {
    const Formation = await FormationModel.findById(req.params.id)
    if (Formation) {
        Formation.title=req.body.title||Formation.title;
        Formation.date=req.body.date||Formation.date;
        Formation.heure=req.body.heure||Formation.heure;
        Formation.date_fin=req.body.date_fin||Formation.date_fin;
        Formation.duree=req.body.duree||Formation.duree;
        Formation.formateur=req.body.formateur||Formation.formateur;
        Formation.prix=req.body.prix||Formation.prix;
        Formation.lieu=req.body.lieu||Formation.lieu;
  
      const updatedFormation = await Formation.save();
  
      res.json(updatedFormation);
    } else {
      res.status(404);
      throw new Error("formation not found");
    }
  };

  getAllFormation = async (req, res) => {
    await FormationModel.find()
      .then((objet) => res.json(objet))
      .catch((err) => res.status(400).json("Error getting objet"));
  };
  getFormation = async(req, res) => {
    await FormationModel.findById(req.params.id)
    .then(objet => res.status(200).json(objet))
    .catch((err) => res.status(400).json("Error Formation"));
  };
  deleteFormation = async (req, res) => {
    const Formation = await FormationModel.findById(req.params.id);
    console.log(req.param.id);
  
    if (Formation) {
      await Formation.remove();
      res.json({ message: "Formation removed" });
    } else {
      res.status(404);
      throw new Error("Formation. not found");
    }
  };
  
 



  module.exports={
    createFormation,
    getAllFormation,
    getFormation,
    updateFormation,
    deleteFormation
  }
