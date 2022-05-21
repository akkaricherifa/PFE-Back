const CompetenceModel = require("../model/competence");



createCompetence = async (req, res) => {
    try {
      const newCompetence = new CompetenceModel({
        nom : req.body.nom,
        niveau :req.body.niveau,
      });
      await newCompetence.save();
      res.status(201).json({
        message: "Competence created",
        data: newCompetence,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

updateCompetence = async (req, res) => {
    const competence = await CompetenceModel.findById(req.params.id)
    if (competence) {
        competence.nom=req.body.nom||competence.nom;
        competence.score=req.body.score||competence.score;
     
  
      const updatedcompetence = await competence.save();
  
      res.json(updatedcompetence);
    } else {
      res.status(404);
      throw new Error("Adherent not found");
    }
  };

  getAllCompetence = async (req, res) => {
    await CompetenceModel.find()
      .then((objet) => res.json(objet))
      .catch((err) => res.status(400).json("Error getting objet"));
  };
  
  getCompetence = async(req, res) => {
    await CompetenceModel.findById(req.params.id)
    .then(objet => res.status(200).json(objet))
    .catch((err) => res.status(400).json("Error competence"));
  };

 getCompetenceById= async (req, res) => {
   await CompetenceModel.find({adherent:req.params.id}).then((obj)=>res.status(200).json(obj))
   .catch((err)=>res.status(400).json('error getting competence'))
 }

  module.exports={
    updateCompetence,
    createCompetence,
    getAllCompetence,
    getCompetence,
    getCompetenceById
  }

