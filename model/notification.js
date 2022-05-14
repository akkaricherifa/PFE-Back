var mongoose = require('mongose');

var notificationSchema = ongoose.Schema ({

idf:{
    type:String,
},


date:{
    type:String,
},

ida:{
    type:String,
},

msg:{
    type:String,

 }



});
module.exports = mongoose.model('notification',notificationSchema)