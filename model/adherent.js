var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Setup schema
var adherentSchema = mongoose.Schema({
    
    email: {
        type: String,
        
    },
    password: {
        type: String,
      
    },
    CIN: {
        type: String,
      
    },
    nom: {
        type: String,
        
    },
    prenom: {
        type: String,
        
    },
    civilite: {
        type: String,
     
  
    },
    niveau: {
        type: String,
       
    },
    profession:{
        type: String,
      
  

    },
    cycle: {
        type: String,
   
      
    },
    etablissement: {
        type: String,
        
      
    },
    telephone: {
        type: String,
       

    },
    specialite: {
        type: String,
       
    
    },
    photo: {
        type: String,
       
    
    },
    role:{
        type: String,
        default: "Adherent",
    },
    competence:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'competence',
    
    }
   
   
}, {
    timestamps: true,
})
adherentSchema.methods.generateTokens = function() {
    const token = jwt.sign({ _id: this._id }, 'privateKey', { expiresIn: "1h" })
    return token;
};

adherentSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
adherentSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('adherent', adherentSchema)