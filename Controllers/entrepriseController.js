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
   from:emailEnt,
   to:req.body.email,
   subject:'Invitation à un Entretien à Notre Entreprise',
   text :"Bonjour Prenom et nom de Candidat"+","+"\r\n" + 
   "\r\n" + 
   " Après examen de votre Dossier, Nous sommes intéressés par votre Profil et souhaitons vous rencontrer personnellement.\r\n" + 
   "\r\n" + 
   "jjjjjjjjjjjjjjjjjjjjjjjjjj.\r\n" + 
   "\r\n" + 
   "Nous avons le plaisir de vous convier à un entretien d'embauche si vous êtes intéressée bien sur. \r\n" + 
   "\r\n" + 
   "on vous attend chez nous pour un entretien ..\r\n" + 
   "\r\n" + 
   "Si vous avez des questions, n'hésitez pas à me contacter par téléphone ou par courriel.\r\n" + 
   "\r\n" + 
   "\r\n" + 
   "\r\n" + 
   "Avec nos meilleures Salutations"
  
  };
  
  transporter.sendMail(mailOptions,function(err,data) {
    if (err) {
      console.log('Error Occurs', err);
    } else {
      console.log('message envoyé !!!!!!!!!');
    }
  });
  }
  
  
module.exports = {
    createEntreprise,  
    getEntreprise,
    getAllEntreprise,
    sendMail

  };