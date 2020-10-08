const express = require('express');
const router = express.Router();
var _ = require('lodash')
var {checkAuthorization, userModel} = require('../../server/utils/AuthorizationMiddleWare')
var mUser = require('../../model/User')

const mongoose = require('../../db/dbConnection');

//const userModel = mongoose.model('User', mUser);


var getUserMiddleWare =  async (req, res, next) => {
    // TODO AUTHORIZE BY JWT TOKEN
  await checkAuthorization(req, res, next).then(()=>{

   })

    if (!req.isAuthorize){
        return
    }

        let query = req.query;
    if (query.id && query.size) {
        let mongoosQuery = userModel.find();
        mongoosQuery.where('createDate').gt(query.id)
            .limit(Number(query.size))
            .exec((err, doc) => {
                if (doc) {
                    req.doc = doc;
                    next()
                } else {
                    res.send('user not found')
                }

            });

    } else {
        userModel.find({}, (err, doc) => {
            req.doc = doc;
            next()
        })
    }


}


router.get('/getuser', getUserMiddleWare, (req, res) => {
    console.log(req.doc)
    var response = req.doc
    let user = response.map(user => ({
        name: user.name,
        id: user._id,
        createDate: user.createDate
    }))
    user = {
        data: user,
        startusCode: 200
    }
    res.send(user)

})

module.exports = router