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
    emailCan: {
        type: String,
     
  
    },
    
    ville:{
        type: String,
      
  

    },
    pathCv: {
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
        default: "Adherent",
    },
    niveauExp:{
        type: String,
        default: "Adherent",
    },
    experience:{
        type: String,
        default: "Adherent",
    },
   

    
   
   
}, {
    timestamps: true,
})
candidatSchema.methods.generateTokens = function() {
    const token = jwt.sign({ _id: this._id }, 'privateKey', { expiresIn: "1h" })
    return token;
};

candidatSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
candidatSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('candidat', candidatSchema)