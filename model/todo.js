var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { date, string } = require('joi');

// Setup schema
var todoSchema = mongoose.Schema({
    
    title: {
        type: String,
        
    },
    
    completed: {
        type: String,
        
    },
 
}, {
    timestamps: true,
})



module.exports = mongoose.model('todo', todoSchema)