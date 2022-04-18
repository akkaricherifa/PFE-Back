const express = require("express");
const db = require("./Config/database");
const cors = require("cors");
const PORT = 3000;

const app = express();
const adminRoute = require("./Routes/adminRoute");
const adherentRoute = require("./Routes/adherentRoute");
const candidatRoute = require("./Routes/candidatRoute");
const entrepriseRoute = require("./Routes/entrepriseRoute");


app.use(express.json());
app.use(express.urlencoded({ extended:false })); 
app.use(cors());
app.use("/admin",adminRoute);
app.use("/adherent",adherentRoute);
app.use("/candidat",candidatRoute);
app.use("/entreprise",entrepriseRoute);


app.listen(
  PORT,
  console.log("Server is running in adresse : http://localhost:" + `${PORT}`)
);