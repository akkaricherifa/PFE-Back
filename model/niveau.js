var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { normalizeNodeOptions } = require('ioredis/built/cluster/util');

// Setup schema
var niveauSchema = mongoose.Schema({
    niveauUser: {
        type: String,

    },

    adherent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'adherent',
    
    }],
    competence:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'competence',
    
    },
  
}, {
    timestamps: true,
})


module.exports = mongoose.model('niveau', niveauSchema)