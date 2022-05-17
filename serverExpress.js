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
const todoRoute= require("./Routes/todoRoute");
const suggestionRoute= require("./Routes/suggestionRoute");
require('dotenv').config();
var uploadRoute = require("./Routes/uploadRoute");

const fileUpload = require('express-fileupload')



app.use(express.json());
app.use(express.urlencoded({ extended:false })); 
app.use(cors());

app.use(fileUpload())

app.use(express.static(process.env.FILE_UPLOAD_PATH))

app.use("/admin",adminRoute);
app.use("/adherent",adherentRoute);
app.use("/candidat",candidatRoute);
app.use("/entreprise",entrepriseRoute);
app.use("/competence",competenceRoute);
app.use("/formation",formationRoute);
app.use("/suggestion",suggestionRoute);
app.use("/todo",todoRoute);
app.use("/", uploadRoute);

app.listen(
  PORT,
  console.log("Server is running in adresse : http://localhost:" + `${PORT}`)
); 