var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Setup schema
var adminSchema = mongoose.Schema({
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
adminSchema.methods.generateTokens = function() {
    const token = jwt.sign({ _id: this._id }, 'privateKey', { expiresIn: "1h" })
    return token;
};

adminSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
adminSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('admin', adminSchema)