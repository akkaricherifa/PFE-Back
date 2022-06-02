const SuggestionModel = require("../model/suggestion");
const AdherentModel = require("../model/adherent");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const suggestion = require("../model/suggestion");

createSuggestion = async (req, res) => {
  // const adherent= await AdherentModel.findById(req.params.id).populate({path:'suggestion'});
    try {
      const newSuggestion = new SuggestionModel(req.body);
      await newSuggestion.save();
      res.status(201).json({
        message: "Suggestion created",
        data: newSuggestion,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  // createSuggestion = async (req, res) => {
 
  //   console.log(req.params.id);
  
  //  const adherent= await AdherentModel.findById(req.params.id).populate({path:'suggestion'});
  //   if (adherent) {
  //     console.log(adherent);
  //     adherent.suggestion.push(req.body.idSugg)
  //     await adherent.save();
  //     res.json({ message: "Adherent succes" });
  //   } else {
  //     res.status(404);
  //     throw new Error("Adherent not found");
  //   }
  // }
updateSuggestion = async (req, res) => {
    const Suggestion = await SuggestionModel.findById(req.params.id)
    if (Suggestion) {
        Suggestion.titre=req.body.titre||Suggestion.titre;
        Suggestion.content=req.body.content||Suggestion.content;
        
        const updatedSuggestion = await Suggestion.save();
  
      res.json(updatedSuggestion);
    } else {
      res.status(404);
      throw new Error("Suggestion not found");
    }
  };

deleteSuggestion = async (req, res) => {
    const Suggestion = await SuggestionModel.findById(req.params.id);
    console.log(req.param.id);
  
    if (Suggestion) {
      await Suggestion.remove();
      res.json({ message: "Suggestion removed" });
    } else {
      res.status(404);
      throw new Error("Suggestion. not found");
    }
  };
  
  getSuggestion = async(req, res) => {
    await SuggestionModel.findById(req.params.id)
    .then(objet => res.status(200).json(objet))
    .catch((err) => res.status(400).json("Error Suggestion"));
  };

  getAllSuggestion = async (req, res) => {
    await SuggestionModel.find()
      .then((objet) => res.status(200).json(objet))
      .catch((err) => res.status(400).json("Error getting objet"));
  };
  

  module.exports = {
    createSuggestion,
    deleteSuggestion,
    getAllSuggestion,
    getSuggestion,
    updateSuggestion,
  };

