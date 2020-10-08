const mongoose = require('../../db/dbConnection');
var mUser = require('../../model/User')
/*mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/Chat', {useNewUrlParser: true, useUnifiedTopology: true})*/
const userModel = mongoose.model('User', {
    name: String,
    roomId: {type: String},
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    createDate: Number,
    email: String
});


var  checkAuthorization = async (req, res, next) => {
    if (req.header('Authorization')) {
       await userModel.find({'token.token': req.header('Authorization')}, (err, doc) => {
          if (doc.length==0){
              res.status(400).send('please re Authorize');
              return
          }
            if (doc[0].token[0].token===req.header('Authorization')) {
                req.isAuthorize = true
                next()
            } else {
                res.status(400).send('please re Authorize');
            }

        })
        //  next
    } else {
        res.status(400).send('please re Authorize');
        //  next
    }
}

module.exports = {checkAuthorization,userModel}