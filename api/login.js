const jswonwebtoken = require('jsonwebtoken');
const mongodb = require('mongodb').MongoClient;
const mongodId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const _ = require('lodash')
mongoose.Promise = global.Promise
const express = require('express');
const router = express.Router();

/*const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());*/

mongoose.connect('mongodb://localhost:27017/Chat', {useNewUrlParser: true, useUnifiedTopology: true});

//UserModel

var userSchema = new mongoose.Schema(
    {
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
        createDate: Date,
        email: String
    })

var userModel = mongoose.model('user', userSchema);

router.get('/api/login', (req, res) => {
    res.send('message received')
});

userSchema.methods.generateAuthToken =async  function (user) {
    var access = 'auth'
    var token = jswonwebtoken.sign({_id: user._id.toHexString(), access}, '123abc').toString();

    user.token.push({access, token})

  return   user.save().then((document) => {
            return new Promise(resolve => {
                 resolve(user)
            })


    });


}
var middle = (req,res,next)=>{
    if (req.body.password&&req.body.name){
        next();
    }else{
        res.status(400).send('please fill name and password')
    }
}


router.post('/api/create/user', middle,(req, res) => {
    var received = new userModel({
        name: req.body.name,
        password: req.body.password
    });
res.send('ok')
    received.save().then((document) => {
        userSchema.methods.generateAuthToken(document).then((tokenizedResult) => {
            res.send(_.pick(tokenizedResult, ['_id', 'name', 'token']))
        })
    })

})

router.post('/api/uploads/profileImage',(req, res) => {
    var received = new userModel({
        name: req.body.name,
        password: req.body.password
    });

    received.save().then((document) => {
        userSchema.methods.generateAuthToken(document).then((tokenizedResult) => {
            res.send(_.pick(tokenizedResult, ['_id', 'name', 'token']))
        })
    })

})






module.exports = router