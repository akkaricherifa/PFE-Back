var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { date, string } = require('joi');

// Setup schema
var suggestionSchema = mongoose.Schema({
    
    titre: {
        type: String,
        
    },
    
    content: {
        type: String,
        
    },
 
}, {
    timestamps: true,
})



module.exports = mongoose.model('suggestion', suggestionSchema)