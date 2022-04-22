var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var emailMessageSchema = mongoose.Schema({
    to_address: {
        type: String,
        required: true
    },
    
    subject: {
        type:String,
        required: true,
    
    },
    Text: {
        type:String,
        required: true,
        
    },
    
    
}, {
    timestamps: true,
})


module.exports = mongoose.model('emailMessage', emailMessageSchema)
