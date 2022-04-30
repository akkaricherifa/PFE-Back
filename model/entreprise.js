var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Setup schema
var entrepriseSchema = mongoose.Schema({
    
    emailEnt: {
        type: String,
        
    },
    password: {
        type: String,
      
    },
    
    nomEnt: {
        type: String,
        
    },
    nomResp: {
        type: String,
        
    },
    telEnt: {
        type: String,
        
    },
    adresse: {
        type: String,
        
    },
    role:{
        type: String,
        default: "entreprise",
    },
  
   
       

   
   
}, {
    timestamps: true,
})
entrepriseSchema.methods.generateTokens = function() {
    const token = jwt.sign({ _id: this._id }, 'privateKey', { expiresIn: "1h" })
    return token;
};



module.exports = mongoose.model('entreprise', entrepriseSchema)