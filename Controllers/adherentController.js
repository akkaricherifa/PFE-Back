const AdherentModel = require("../model/adherent");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const adherent = require("../model/adherent");
const CompetenceModel = require("../model/competence");
const NiveauModel = require("../model/niveau");
// const niveau = require("../model/niveau");
// const niveau = require("../model/niveau");

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
// //////////////////////hedhi methode bech user yzid compétence mte3ooo/////////////////////////////////////////
ajoutCompetence2=async(req,res)=>{
  let data=[]
  console.log(req.params.id);
  console.log(req.body.niveau);
    console.log("nommmmm",req.body.nom);

   const adherent=await AdherentModel.findById(req.params.id).populate({path:'competence'}).then((data)=>{
     console.log("here ",data.competence._id);
     data.competence.push(req.body.nom) ; 
    //  data.competence.niveau.push(req.body.niveau);
     
      data.save()
     .then((user) => res.status(200).json(user))
     .catch((err) => res.status(400).json("Error on user save: " + err));
 })
 .catch((err) =>
   res.status(400).json("Error on competence save: " + err)
 );
  //  const competence =await CompetenceModel.findById(req.body.nom)
}



//**********************************************ajoutCompetence jdida************************************************* */
ajoutCompetenceByUser = async (req,res)=>{
  const niveauExist= await NiveauModel.findOne({adherent:req.body.adhrent})
  if(niveauExist){
    console.log(niveauExist);
    niveauExist.competence.push(req.body.competence);
niveauExist.save();
  }

  else{

  
  try {
    const niveau = new NiveauModel(req.body);
    await niveau.save();
    res.status(201).json({
      message: "niveau  created success",
      data: niveau,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }}

  // let data=[]
  // console.log(req.params.id);
  // console.log(req.body.niveau);
  //   console.log("nommmmm",req.body.nom);
  //   const niveau = new NiveauModel(req.body
     
  //   )
  //   console.log(niveau);
  //   niveau.save()
  //   res.status(200).json(niveau)
  }

//    const adherent=await AdherentModel.findById(req.params.id).populate({path:'competence'}).then((data)=>{
//      console.log("here ",data.competence._id);
//      data.niveau.push(req.body.nom) ; 
//     //  data.competence.niveau.push(req.body.niveau);
     
//       data.save()
//      .then((user) => res.status(200).json(user))
//      .catch((err) => res.status(400).json("Error on user save: " + err));
//  })
//  .catch((err) =>
//    res.status(400).json("Error on competence save: " + err)
//  );
// }


// **************************************************************************************************
participer = async (req, res) => {
 
  console.log(req.params.id);
  console.log(req.body.event);

 const adherent= await AdherentModel.findById(req.params.id).populate({path:'formation'});
  if (adherent) {
    console.log(adherent);
    adherent.formation.push(req.body.event)
    await adherent.save();
    res.json({ message: "Adherent succes" });
  } else {
    res.status(404);
    throw new Error("Adherent not found");
  }
}
// *****************************************************************************************************
getAdherentByFormation = async(req,res) => {
  console.log(req.params.id);
  console.log(req.body.event);
  const adherent=await AdherentModel.find({formation:req.params.id});
  res.json(adherent)

}
// ******************************************************************************************************
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
// */******************************************************************************** */
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
  await AdherentModel.findById(req.params.id). populate({ path: 'formation' }).
  populate({ path: 'competence' })
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

  // ajoutCompetence = async (req, res) => {
  //   try {
  //     const newCompetence = new CompetenceModel({
  //       nom : req.body.nom,
  //       niveau :req.body.niveau,
  //     });
  //     await newCompetence.save();
  //     res.status(201).json({
  //       message: "Competence created",
  //       data: newCompetence,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: error.message,
  //     });
  //   }
  // };

  getCompetenceById= async (req, res) => {
    await NiveauModel.find({adherent:req.params.id}).populate({path:'competence'}).then((obj)=>res.status(200).json(obj))
    .catch((err)=>res.status(400).json('error getting competence'))

  }

  updatePhoto = async (req, res) => {
    const Adherent = await AdherentModel.findById(req.params.id);
    if (Adherent) {
      Adherent.file = req.body.file || Adherent.file;
      const updatedAdherent = await Adherent.save();
  
      res.json(updatedAdherent);
    } else {
      res.status(404);
      throw new Error("Adherent not found");
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
  uploadFile,
  getAdherentByFormation,
  ajoutCompetence2,
  getCompetenceById,
  ajoutCompetenceByUser,
  updatePhoto
}