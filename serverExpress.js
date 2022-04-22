const express = require("express");
const db = require("./Config/database");
const cors = require("cors");
const PORT = 3000;
const app = express();
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const mailGun = require('nodemailer-mailgun-transport');
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});
// app.use(bodyParser.json({type:"application/json"}));
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(express.static('public'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.post('/api/upload', multipartMiddleware, (req, res) => {
//   res.json({
//       'message': 'File uploaded successfully'
//   });
// });

// app.get('/getFile',function(req,res,next){
//   res.download('./public/google.png',function(err){
//   if(err){
//   next(err);}
//   })
//   })
  
//   app.use(function(err,req,res,next){
//   res.status(err.status).send(err);
//   })

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