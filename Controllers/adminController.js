const mongoose = require("mongoose");
const express = require("express");
const adminModel = require("../model/admin");
const adherentModel = require("../model/adherent");
const entrepriseModel=require("../model/entreprise");
const CompetenceModel=require("../model/competence");
const NiveauModel=require("../model/niveau");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const candidat = require("../model/candidat");
const jwt = require("jsonwebtoken");
const secret = "test";
const _ = require("lodash");
const admin = require("../model/admin");

const { getMaxListeners } = require("pdfkit");
const niveau = require("../model/niveau");


//hedhi ili nadhreb aleha
login = async (req, res, next) => {
  let entreprise =await  entrepriseModel.findOne({emailEnt:req.body.email});
  let admin = await adherentModel.findOne({ email: req.body.email });
  if(!entreprise && !admin){return res.status(400).json({ message: "User  not found" });}
  if(admin){
    console.log("hello");
   const checkPassword = await bcrypt.compare(req.body.password, admin.password);
   if (!checkPassword) {
     return res.status(400).json({ message: "Invalid Email or Password " });
   }
   const token = admin.generateTokens();
   // await admin.save();
   res.status(200).json({
     token: token,
     admin: {
       _id: admin.id,
       email: admin.email,
       role: admin.role,
     },
   })};
   if(entreprise){const checkPassword = await bcrypt.compare(req.body.password, entreprise.password);
     if (!checkPassword) {
    return res.status(400).json({ message: "Invalid Email or Password " });}
    const token = entreprise.generateTokens();
  // await admin.save();
  res.status(200).json({
    token: token,
    admin: {
      _id: entreprise.id,
      email: entreprise.emailEnt,
       role: entreprise.role,
    },
  });
  }
}

register = async (req, res) => {
  const oldadmin = await adminModel.findOne({ email: req.body.email });
  if (oldadmin) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const admin = new adminModel(req.body);
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  admin.role="admin";
  

  await admin.save();
  const token = admin.generateTokens();
  res.header("x-auth-token", token).send(_.pick(admin, ["_id", "email"]));
};
//************************************************** */ admin ajout une compétence/******************************************************************************* */
ajouterCompetence = async (req, res) => {
  try {
    const newCompetence = new CompetenceModel(req.body);
    await newCompetence.save();
    res.status(201).json({
      message: "Competence  created success",
      data: newCompetence,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// lenna bech njiboooo kol adherent wel comp mte3ooo
getCompetenceByAdherent = async(req,res) => {
  await adherentModel.findById(req.params.id);
  await NiveauModel.find({adherent:req.params.id}).populate({path:'competence'}).then((obj)=>res.status(200).json(obj))
    .catch((err)=>res.status(400).json('error getting competence'))
    console.log(req.params.id);

}


getAllCompetence = async (req, res) => {
  await CompetenceModel.find()
    .then((objet) => res.json(objet))
    .catch((err) => res.status(400).json("Error getting objet"));
};


getCompetence = async(req, res) => {
  await CompetenceModel.findById(req.params.id)
  .then(objet => res.status(200).json(objet))
  .catch((err) => res.status(400).json("Error Competence"));
};


deleteCompetence = async (req, res) => {
  const Competence = await CompetenceModel.findById(req.params.id);
  console.log(req.param.id);

  if (Competence) {
    await Competence.remove();
    res.json({ message: "Competence removed" });
  } else {
    res.status(404);
    throw new Error("Competence. not found");
  }
};




changerpwdsuser = async (req, res, next) => {
  const admin = await adminModel.findOne({ email: req.body.email });
  if (!admin) {
    return res.status(400).json({ message: "Email doesn't exists" });
  }
  const checkPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!checkPassword) {
    return res.status(400).json({ message: "Invalid Email or Password " });
  }
  const salt = await bcrypt.genSalt(10);
  const verifPassword = await bcrypt.compare(
    req.body.oldpassword,
    admin.password
  );

  if (!verifPassword) {
    return res.status(400).json({ message: "Invalid old password " });
  } else {
    admin.password = await bcrypt.hash(req.body.Confirmpassword, salt);
    await admin.save();
    const token = admin.generateTokens();
    res.header("x-auth-token", token).send(_.pick(admin, ["_id", "email"]));
  }
};

changerpwdadmin = async (req, res, next) => {
  console.log(req.body);
  const admin = await adminModel.findOne({ email: req.body.email });
  if (!admin) {
    return res.status(400).json({ message: "Email doesn't exists" });
  }

  const salt = await bcrypt.genSalt(10);

  const verifPassword = await bcrypt.compare(
    req.body.oldpassword,
    admin.password
  );

  if (!verifPassword) {
    return res.status(400).json({ message: "ancien mot de passe erroné " });
  } else {
    admin.password = await bcrypt.hash(req.body.Confirmpassword, salt);
    await admin.save();
    const token = admin.generateTokens();
    res.header("x-auth-token", token).send(_.pick(admin, ["_id", "email"]));
  }

};
downloadFile=async(req,res)=> {

  http.get(url,function(res){
    const fileStream = fs.createWriteStream("photo.jpeg");
res.pipe(fileStream);
fileStream.on("finish",function() {
    fileStream.close();
    console.log("doneeee!!!!!!!!!!!");

});
})


}
// *****************************************************email de confirmation**********************************
sendMail=async(req,res)=>{
  console.log(req.body.email);
  let transporter= nodemailer.createTransport({
  service:'gmail',
  auth:{
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

let mailOptions= {
 from:'arsii.recrutement@gmail.com',
 to:req.body.email,
 subject:'Invitation à un Entretien à L Association ARSII',
 text :"Bonjour Cher Candidat"+","+"\r\n" + 
 "\r\n" + 
 "Nous vous remercions pour votre candidature .\r\n" + 
 "\r\n" + 
 "Après examen de votre Dossier, Nous sommes intéressés par votre Profil et souhaitons vous rencontrer personnellement.\r\n" + 
 "\r\n" + 
 "Nous avons le plaisir de vous convier à un entretien d'embauche  . \r\n" + 
 "\r\n" + 
 "Je vous enverrai une invitation dès que j'aurai reçu le calendrier des disponibilités des gestionnaires..\r\n" + 
 "\r\n" + 
 "Si vous avez des questions, n'hésitez pas à Nous contacter par téléphone ou par courriel.\r\n" + 
 "\r\n" + 
 "\r\n" + 
 "\r\n" + 
 "Avec nos Meilleures Salutations"

};
transporter.sendMail(mailOptions,function(err,data) {
  if (err) {
    console.log('Error Occurs', err);
  } else {
    console.log('Email sent !!!!!!!!!');
  }
});
};
/////////////////////// emaiiil de REJECTION ////////////////////////////////
sendDenyMail=async(req,res)=>{
  console.log(req.body.email);
  let transporter= nodemailer.createTransport({
  service:'gmail',
  auth:{
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

let mailOptions= {
 from:'arsii.recrutement@gmail.com',
 to:req.body.email,
 subject:'Réponse pour Votre Candidature à ARSII',
 text :"Bonjour Cher Candidat"+","+"\r\n" + 
 "\r\n" + 
 "Nous vous remercions pour votre candidature .\r\n" + 
 "\r\n" + 
 "Après examen de votre Dossier, Nous sommes au regret de ne pas pouvoir répondre favorablement à votre demande.\r\n" + 
 "\r\n" + 
 " Nous conservons votre Curriculum vitae afin de pouvoir vous contacter si un poste susceptible de vous intéresser venait à se présenter . \r\n" + 
 "\r\n" + 
 "Soyez cependant assuré que cette décision ne met pas en cause vos qualités personnelles, ni meme celles de votre formation..\r\n" + 
 "\r\n" + 
 "Nous vous souhaitons une pleine réussite dans vos futures recherches .\r\n" + 
 "\r\n" + 
 "\r\n" + 
 "\r\n" + 
 "Avec nos Meilleures Salutations"

};
transporter.sendMail(mailOptions,function(err,data) {
  if (err) {
    console.log('Error Occurs', err);
  } else {
    console.log('message envoyé !!!!!!!');
  }
});
}

module.exports = {
  register,
  login,
  sendMail,
  sendDenyMail,
  ajouterCompetence,
  getAllCompetence,
  getCompetence,
  deleteCompetence,
  downloadFile,
  getCompetenceByAdherent
  

  };
