const mongoose = require('./dbConnection');
//const messageSchema = require('../model/messageModel')
var _ = require('lodash');
let messageSchema;
let MessageModel

class Message {
    constructor() {
        messageSchema = new mongoose.Schema({}, {strict: false});
        MessageModel = mongoose.model('Message', messageSchema);
    }

    async addToDb(message) {
        let messageObject = new MessageModel(message);
        return await messageObject.save().then((err, document) => {
            return document;
        })
    }

    async getMessage(id) {
        return await MessageModel.findOne({'_id': id}).then((document) => {
            return (document);
        })

        /*    return     MessageModel.findOne({'_id': id}).then((document) => {
                    //    var d ="{sdfsadfs}"
                    //   return '{"sdfsadfs":"asdfasdf"}';
                    //  JSON.stringify(document,' ',2)

                    return new Promise((resolve => {
                        resolve(JSON.stringify(document,' ',2));
                    }))
                    // return 'peyman'
                })*/
    }


    async deleteMessageFromDb(id, isPhycicalDelete) {

    }

    async getAllMessages(count, from, to) {
    return await  MessageModel.find().asec.limit(2).then((document)=>{
          return document;
      })
    }


}


module.exports = {Message};


