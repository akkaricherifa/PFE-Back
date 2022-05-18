const AdherentModel = require("../model/adherent");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const adherent = require("../model/adherent");
const CompetenceModel = require("../model/competence");


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

participer = async (req, res) => {
 
  console.log(req.params.id);
  console.log(req.body.id);

 const adherent= await AdherentModel.findById(req.params.id).populate('formation');
//  console.log(adherent.formation);
console.log(adherent);
  // .then(objet =>  res.status(200).json(objet))
  // .catch((err) => res.status(400).json("Error getting Adherent"));

  if (adherent) {
    adherent.formation.push(req.body.id)
    await adherent.save();
    res.json({ message: "Adherent removed" });
  } else {
    res.status(404);
    throw new Error("Adherent. not found");
  }


}







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
  await AdherentModel.findById(req.params.id).populate('formation')
  .then(objet => res.status(200).json(objet))
  .catch((err) => res.status(400).json("Error getting Adherent"));
};

uploadFile = async (req, res) => {
  if (!req.files) {
    res.status(404).json({
      message: 'please upload a file',
    });
  }
    const file = req.files.file

    if (file.size > process.env.MAX_FILE_UPLOAD) {
      res.status(400).json({
        message: 'please upload a file less then ' + process.env.MAX_FILE_UPLOAD,
      });
    }

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err)=>{
      if (err) {
        console.log(err)
        res.status(400).json({
          message:  err,
        });
      }
      res.status(200).json({
        success: true,
        data:file.name
      });

    }
    
    )


};

changerpwdsuser = async (req, res, next) => {
  const adherent = await adherentModel.findOne({ email: req.body.email });
  if (!adherent) {
    return res.status(400).json({ message: "Email doesn't exists" });
  }
  const checkPassword = await bcrypt.compare(req.body.password, adherent.password);
  if (!checkPassword) {
    return res.status(400).json({ message: "Invalid Email or Password " });
  }
  const salt = await bcrypt.genSalt(10);
  const verifPassword = await bcrypt.compare(
    req.body.oldpassword,
    adherent.password
  );
  if (!verifPassword) {
    return res.status(400).json({ message: "Invalid old password " });
  } else {
    adherent.password = await bcrypt.hash(req.body.Confirmpassword, salt);
    await adherent.save();
    const token = adherent.generateTokens();
    res.header("x-auth-token", token).send(_.pick(adherent, ["_id", "email"]));
  }
  };
module.exports = {
  createAdherent,
  deleteAdherent,
  updateAdherent,
  getAllAdherent,
  getAdherent,
  changerpwdsuser,
  participer,
  uploadFile
}