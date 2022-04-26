const CompetenceModel = require("../model/competence");



createCompetence = async (req, res) => {
    try {
      const newCompetence = new CompetenceModel(req.body);
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
  
 



  module.exports={updateCompetence,createCompetence,getAllCompetence}

