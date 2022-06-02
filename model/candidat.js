var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { date, string } = require('joi');

// Setup schema
var candidatSchema = mongoose.Schema({
    
    nomCan: {
        type: String,
        
    },
    prenomCan: {
        type: String,
      
    },
    
    dateOfBirth: {
        type: String,
        
    },
    phoneCan: {
        type: String,
        
    },
    password: {
        type: String,
        
    },
    emailCan: {
        type: String,
     
  
    },
    
    ville:{
        type: String,

    },
    file: {
        type: String,
   
      
    },
    pathMotivationLetter: {
        type: String,
        
      
    },
    niveauEtud: {
        type: String,
       

    },
    titreDiplome: {
        type: String,
       
    
    },
    university:{
        type: String,
       
    },
    niveauExp:{
        type: String,
      
    },
    experience:{
        type: String,
       
    },
    role:{
        type: String,
        default: "Candidat",
    },
}, {
    timestamps: true,
})


module.exports = mongoose.model('candidat', candidatSchema)