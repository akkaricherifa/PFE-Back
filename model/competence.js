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
        default: 0
    },
    
    adherent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'adherent',
    
    },

    
}, {
    timestamps: true,
})


module.exports = mongoose.model('competence', competenceSchema)
