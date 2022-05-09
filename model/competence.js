var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { normalizeNodeOptions } = require('ioredis/built/cluster/util');

// Setup schema
var competenceSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    
    niveau: {
        type:String,
        required: true,
        // default: 0
    },
    
    
}, {
    timestamps: true,
})


module.exports = mongoose.model('competence', competenceSchema)
