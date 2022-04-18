const CandidatModel = require("../model/candidat");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const candidat = require("../model/candidat");

createCandidat = async (req, res) => {
  try {
    const newCandidat = new CandidatModel(req.body);
    await newCandidat.save();
    res.status(201).json({
      message: "Candidat created",
      data: newCandidat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

deleteCandidat = async (req, res) => {
    const Candidat = await CandidatModel.findById(req.params.id);
    console.log(req.param.id);
  
    if (Candidat) {
      await Candidat.remove();
      res.json({ message: "Candidat removed" });
    } else {
      res.status(404);
      throw new Error("Candidat. not found");
    }
  };
  
  getCandidat = async(req, res) => {
    await CandidatModel.findById(req.params.id)
    .then(objet => res.status(200).json(objet))
    .catch((err) => res.status(400).json("Error candidat"));
  };

  getAllCandidat = async (req, res) => {
    await CandidatModel.find()
      .then((objet) => res.status(200).json(objet))
      .catch((err) => res.status(400).json("Error getting objet"));
  };
  

  module.exports = {
    createCandidat,
    deleteCandidat,
    getAllCandidat,
    getCandidat,
  };

