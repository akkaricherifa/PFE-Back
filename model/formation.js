var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { date } = require('joi');

// Setup schema
var formationSchema = mongoose.Schema({
    
    title: {
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
    lieu: {
        type: String,
    },
 
   
   
}, {
    timestamps: true,
})



formationSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('formation', formationSchema)