const AdherentModel = require("../model/adherent");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const adherent = require("../model/adherent");
const CompetenceModel = require("../model/competence");



// createAdherent = async (req, res) => {
//   try {
//     const newAdherent = new AdherentModel(req.body);
//     await newAdherent.save();
//     res.status(201).json({
//       message: "Adherent created",
//       data: newAdherent,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


createAdherent = async (req, res) => {
  const oldAdherent = await AdherentModel.findOne({ email: req.body.email });
  if (oldAdherent) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const Adherent = new AdherentModel(req.body);
  const salt = await bcrypt.genSalt(10);
  Adherent.password = await bcrypt.hash(Adherent.password, salt);
  

  await Adherent.save();
  const token = Adherent.generateTokens();
  res.header("x-auth-token", token).send(_.pick(Adherent, ["_id", "email"]));
};

deleteAdherent = async (req, res) => {
  const Adherent = await AdherentModel.findById(req.params.id);
  console.log(req.param.id);

  if (Adherent) {
    await Adherent.remove();
    res.json({ message: "Adherent removed" });
  } else {
    res.status(404);
    throw new Error("Adherent. not found");
  }
};

updateAdherent = async (req, res) => {
  const Adherent = await AdherentModel.findById(req.params.id);
  if (Adherent) {
    Adherent.email = req.body.email || Adherent.email;
    Adherent.nom = req.body.nom || Adherent.nom;
    Adherent.prenom = req.body.prenom || Adherent.prenom;
    Adherent.civilite = req.body.civilite || Adherent.civilite;
    Adherent.niveau = req.body.niveau || Adherent.niveau;
    Adherent.profession = req.body.profession || Adherent.profession;
    Adherent.cycle = req.body.cycle || Adherent.cycle;
    Adherent.etablissement = req.body.etablissement || Adherent.etablissement;
    Adherent.telephone = req.body.telephone || Adherent.telephone;
    Adherent.specialite = req.body.specialite || Adherent.specialite;
    
    Adherent.telephone = req.body.telephone || Adherent.telephone;

    Adherent.address = req.body.address || Adherent.address;

    const updatedAdherent = await Adherent.save();

    res.json(updatedAdherent);
  } else {
    res.status(404);
    throw new Error("Adherent not found");
  }
};

getAllAdherent = async (req, res) => {
  await AdherentModel.find().populate('competence')
    .then((objet) => res.json(objet))
    .catch((err) => res.status(400).json("Error getting objet"));
};

getAdherent = async(req, res) => {
  await AdherentModel.findById(req.params.id).populate('competence')
  .then(objet => res.status(200).json(objet))
  .catch((err) => res.status(400).json("Error getting Adherent"));
};


// updateCompetence = async (req, res) => {
//   const competence = await CompetenceModel.findByIdAndUpdate(req.params.id,{
//       competence.

//   },);
//   if (competence) {
   

//     const updatedcompetence = await competence.save();

//     res.json(updatedcompetence);
//   } else {
//     res.status(404);
//     throw new Error("Adherent not found");
//   }
// };



module.exports = {
  createAdherent,
  deleteAdherent,
  updateAdherent,
  getAllAdherent,
  getAdherent,
};