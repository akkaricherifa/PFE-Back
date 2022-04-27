const express = require("express");
const db = require("./Config/database");
const cors = require("cors");
const PORT = 3000;
const app = express();
const nodemailer= require('nodemailer');
const adminRoute = require("./Routes/adminRoute");
const competenceRoute = require("./Routes/competenceRoute");
const adherentRoute = require("./Routes/adherentRoute");
const candidatRoute = require("./Routes/candidatRoute");
const entrepriseRoute = require("./Routes/entrepriseRoute");
const formationRoute = require("./Routes/formationRoute");
require('dotenv').config();
var uploadRoute = require("./Routes/uploadRoute");




app.use(express.json());
app.use(express.urlencoded({ extended:false })); 
app.use(cors());
app.use("/admin",adminRoute);
app.use("/adherent",adherentRoute);
app.use("/candidat",candidatRoute);
app.use("/entreprise",entrepriseRoute);
app.use("/competence",competenceRoute);
app.use("/formation",formationRoute);
app.use("/", uploadRoute);





app.listen(
  PORT,
  console.log("Server is running in adresse : http://localhost:" + `${PORT}`)
); 