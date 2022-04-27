const EntrepriseModel = require("../model/entreprise");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const entreprise = require("../model/entreprise");



createEntreprise = async (req, res) => {
  const oldEntreprise = await EntrepriseModel.findOne({ emailEnt: req.body.emailEnt });
  if (oldEntreprise) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const Entreprise = new EntrepriseModel(req.body);
  const salt = await bcrypt.genSalt(10);
  Entreprise.password = await bcrypt.hash(Entreprise.password, salt);
  

  await Entreprise.save();
  const token = Entreprise.generateTokens();
  res.header("x-auth-token", token).send(_.pick(Entreprise, ["_id", "emailEnt"]));
};
  
  getAllEntreprise = async (req, res) => {
    await EntrepriseModel.find()
      .then((objet) => res.status(200).json(objet))
      .catch((err) => res.status(400).json("Error getting objet"));
  };
  

 
  getEntreprise = async(req, res) => {
    await EntrepriseModel.findById(req.params.id)
    .then(objet => res.status(200).json(objet))
    .catch((err) => res.status(400).json("Error entreprise"));
    
  };
  
  
module.exports = {
    createEntreprise,  
    getEntreprise,
    getAllEntreprise,

  };