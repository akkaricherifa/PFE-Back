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
        Formation.nom=req.body.nom||Formation.nom;
        Formation.score=req.body.score||Formation.score;
     
  
      const updatedFormation = await Formation.save();
  
      res.json(updatedFormation);
    } else {
      res.status(404);
      throw new Error("Adherent not found");
    }
  };

  getAllFormation = async (req, res) => {
    await FormationModel.find()
      .then((objet) => res.json(objet))
      .catch((err) => res.status(400).json("Error getting objet"));
  };
  
 



  module.exports={createFormation,getAllFormation}
