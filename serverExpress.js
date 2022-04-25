const express = require("express");
const db = require("./Config/database");
const cors = require("cors");
const PORT = 3000;
const app = express();
const nodemailer= require('nodemailer');
const adminRoute = require("./Routes/adminRoute");
const adherentRoute = require("./Routes/adherentRoute");
const candidatRoute = require("./Routes/candidatRoute");
const entrepriseRoute = require("./Routes/entrepriseRoute");
require('dotenv').config();




app.use(express.json());
app.use(express.urlencoded({ extended:false })); 
app.use(cors());
app.use("/admin",adminRoute);
app.use("/adherent",adherentRoute);
app.use("/candidat",candidatRoute);
app.use("/entreprise",entrepriseRoute);
  


// let transporter= nodemailer.createTransport({
//   service:'gmail',
//   auth:{
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD
//   }
// })

// let mailOptions= {
//  from:'arsii.isitcom21@gmail.com',
//  to:'cherifa.informatique@gmail.com',
//  subject:'Invitation à un entretien à L Association ARSII',
//  text :"Bonjour Prenom et nom de Candidat"+","+"\r\n" + 
//  "\r\n" + 
//  "Nous vous remercions pour votre candidature .\r\n" + 
//  "\r\n" + 
//  "Après examen de votre Dossier, Nous sommes intéressés par votre Profil et souhaitons vous rencontrer personnellement.\r\n" + 
//  "\r\n" + 
//  "Nous avons le plaisir de vous convier à un entretien d'embauche  . \r\n" + 
//  "\r\n" + 
//  "Je vous enverrai une invitation dès que j'aurai reçu le calendrier des disponibilités des gestionnaires..\r\n" + 
//  "\r\n" + 
//  "Si vous avez des questions, n'hésitez pas à me contacter par téléphone ou par courriel.\r\n" + 
//  "\r\n" + 
//  "\r\n" + 
//  "\r\n" + 
//  "Avec nos meilleures Salutations"

// };

// transporter.sendMail(mailOptions,function(err,data) {
//   if (err) {
//     console.log('Error Occurs', err);
//   } else {
//     console.log('Email sent !!!!!!!!!');
//   }
// });


app.listen(
  PORT,
  console.log("Server is running in adresse : http://localhost:" + `${PORT}`)
); 