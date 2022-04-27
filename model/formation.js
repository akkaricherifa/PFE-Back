var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { date } = require('joi');

// Setup schema
var formationSchema = mongoose.Schema({
    
    nomformation: {
        type: String,
        
    },
    date_debut: {
        type: String,
      
    },
    
    date_fin: {
        type: String,
        
    },
    duree: {
        type: String,
        
    },
    formateur: {
        type: String,
     
  
    },
    prix: {
        type: String,
    },
 
   
   
}, {
    timestamps: true,
})
formationSchema.methods.generateTokens = function() {
    const token = jwt.sign({ _id: this._id }, 'privateKey', { expiresIn: "1h" })
    return token;
};

formationSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
formationSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('formation', formationSchema)