const CandidatModel = require("../model/candidat");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const candidat = require("../model/candidat");
// const { uploadFile } = require("./uploadController");

createCandidat = async (req, res) => {
  try {
    const newCandidat = new CandidatModel(req.body);
    await newCandidat.save();
    res.status(201).json({
      message: "Candidat created",
      data: newCandidat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

deleteCandidat = async (req, res) => {
    const Candidat = await CandidatModel.findById(req.params.id);
    console.log(req.param.id);
  
    if (Candidat) {
      await Candidat.remove();
      res.json({ message: "Candidat removed" });
    } else {
      res.status(404);
      throw new Error("Candidat. not found");
    }
  };
  
  getCandidat = async(req, res) => {
    await CandidatModel.findById(req.params.id)
    .then(objet => res.status(200).json(objet))
    .catch((err) => res.status(400).json("Error candidat"));
  };

  getAllCandidat = async (req, res) => {
    await CandidatModel.find()
      .then((objet) => res.status(200).json(objet))
      .catch((err) => res.status(400).json("Error getting objet"));
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

  
  }
  module.exports = {
    createCandidat,
    deleteCandidat,
    getAllCandidat,
    getCandidat,
    uploadFile
  };
  
