var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Setup schema
var RHSchema = mongoose.Schema({
    
    email: {
        type: String,
        
    },
    password: {
        type: String,
      
    },
    
    nom: {
        type: String,
        
    },
    prenom: {
        type: String,
        
    },
   
    role:{
        type: String,
        default: "Adherent",
    }
   
   
}, {
    timestamps: true,
})
RHSchema.methods.generateTokens = function() {
    const token = jwt.sign({ _id: this._id }, 'privateKey', { expiresIn: "1h" })
    return token;
};

RHSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
RHSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('RH', RHSchema)