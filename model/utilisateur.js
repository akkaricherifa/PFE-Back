var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { boolean } = require('joi');

// Setup schema
var utilisateurSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    
}, {
    timestamps: true,
})

module.exports = mongoose.model('utilisateur', utilisateurSchema)