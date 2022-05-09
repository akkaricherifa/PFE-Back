var multer  = require('multer');
var fileUpload= require('../middlewares/upload-middleware');


module.exports={
    fileUploadForm:function(req,res){
        res.render('upload-form.ejs');
     },
     uploadFile:function(req,res){
        var upload = multer({
                    storage: fileUpload.files.storage(), 
                    allowedFile:fileUpload.files.allowedFile 
                    }).single('file');
        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
              res.send(err);
           }else{
              res.render('upload-form');
           }
           
        })
        
     }
}

