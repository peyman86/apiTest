var express = require('express');
var uploader = require('express-fileupload');
var fs = require('fs');
var multer = require('multer')
const bodyParser= require('body-parser')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + './../public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.')[1])
    }


})

var upload = multer({storage: storage})

var uploadRouter = express.Router();

uploadRouter.use(bodyParser.urlencoded({extended: true}))
/*uploadRouter.use(uploader({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));*/

uploadRouter.post('/profile', upload.single('image'), function (req, res, next) {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send({
        isSuccessFull:true,
        imageUrl:`http://localhost:3000/uploads/${file.filename}`,
    })
})


uploadRouter.post('/upload', (req, res) => {
    var object = req.files.firstImage;
    object.mv(__dirname + './../uploads/tmp/' + object.name, (err) => {
        if (err) {
            res.send(err)
        } else {
            let avatar = req.files.firstImage;
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size,
                    path: 'http://localhost:3000/upload/' + avatar.name
                }
            });
        }
    });
    //  res.send('./'+req.uploads.firstImage.filename);
    console.log(req.files);

})

module.exports = uploadRouter

/*
server.listen(3000);*/
