var {app, io, server} = require('../app')
const port = process.env.PORT || 3000;
const {checkAuthorization} = require('../server/utils/AuthorizationMiddleWare');
var admin = require('./firebaseconfig');
var {Message} = require('../db/message');
const {v4: uuidv4} = require('uuid');
var messageDb = new Message();
const {pubnub, uuid} = require('./pubnubConfig');
var {generateMessage, generateLocationMessage} = require('../server/utils/message')
var {isRealString} = require('../server/utils/validation')
const {Users} = require('../server/utils/user')
var users = new Users();
var ably = new require('ably').Realtime('N3m8Ag.m6Aiug:j32AXVH_CcgW7N40')


const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: 'f9d9a6c8',
    apiSecret: 'aIIp3MvSxy72k8pf',
});

/*const readline = require('readline');
var TeleSignSDK = require('telesignsdk');
const customerId = "3CA4AF69-127B-4BD0-AFDD-6EDB082A38F3";
const apiKey = "NrWQLXt24dkTM+tYYTJ77K3uoNs/8QakyIvOOov+HKoqbIkea5M8BuwOE1IQyz+/yWq6pbCSulPfkHh9gQnDRA==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

const phoneNumber = "989356206769";
const messageType = "ARN";
const verifyCode = "32658";
const message = "The Weegle Signup code is " + verifyCode;*/

var TeleSignSDK = require('telesignsdk');

const customerId = "3CA4AF69-127B-4BD0-AFDD-6EDB082A38F3";
const apiKey = "NrWQLXt24dkTM+tYYTJ77K3uoNs/8QakyIvOOov+HKoqbIkea5M8BuwOE1IQyz+/yWq6pbCSulPfkHh9gQnDRA==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

//const phoneNumber = "8613637922908";
const phoneNumber = "8613637922908";
const message = "25785";
const messageType = "OTP";

console.log("## MessagingClient.message ##");

function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}
/*client.sms.message(messageCallback, phoneNumber, message, messageType);*/




app.get('/sendSms', (req, res) => {
    //let phoneNumber =req.query.phone;
    client.sms.message(messageCallback, phoneNumber, message, messageType);
})

/*function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);


        prompt('Enter the verification code received:\n', function (input) {
            if (input === verifyCode) {
                console.log('Your code is correct.');
            } else {
                console.log('Your code is incorrect. input: ' + input + ", code: " + verifyCode);
            }
            process.exit();
        });

    } else {
        console.error("Unable to send message. " + error);
    }
}*/

function prompt(question, callback) {
    const stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}


app.get('/sendNexmoSms', (req, res) => {
    let phoneNumber =req.query.phone;
    nexmo.verify.request({
        number: phoneNumber,
        brand: 'Weegle',
        code_length: '4'
    }, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            const verifyRequestId = result.
                request_id;
            console.log('request_id', verifyRequestId);
            res.send(verifyRequestId);
        }

    });

})

app.get('/checkNexmoSms',(req,res)=>{
    console.log(req.query.req_id +"  "+ req.query.code);
    nexmo.verify.check({
        request_id: req.query.req_id,
        code: req.query.code
    }, (err, result) => {
        console.log(err ? err : result)
    });
})

//Broadcasting event


// PUBNUB SEND MESSAGE
/*app.post('/sendMessage',(req,res)=>{
    pubnub.publish({
        channel: 'ch-1',
        message: req.body
    }, function(status, response) {
        req.body.timetoken =response.timetoken;
        res.send(req.body)
    })

})*/

app.get('/getAllMessagesFromPubNub', (req, res) => {
    pubnub.fetchMessages(
        {
            channels: ['pubnub_onboarding_channel'],
            end: '0',
            count: 100
        },
        (status, response) => {
            // handle response
            res.send(req)
        }
    );
})

// Ably message History
app.get('/getAblyMessageHistory', checkAuthorization, (req, res) => {

    var channel = ably.channels.get(req.query.channel);
    channel.attach(function (err) {
        channel.history({untilAttach: true}, function (err, resultPage) {
            res.send(resultPage.items);

        });
    });

});


app.get('/getMessage', (req, res) => {
    var id = req.query.id;
    messageDb.getMessage(id).then((document) => {

    })
})

app.get('/getAllMessages', (req, res) => {
    messageDb.getAllMessages(1, 1, 1).then((doc) => {
        res.send(doc)
    })
})


// ABLY SEND MESSAGE

app.post('/sendMessage', checkAuthorization, (req, res) => {
    req.body.createdAt = new Date().getTime();
    req.body.id = uuidv4();
    messageDb.addToDb(req.body).then((response) => {
        var channel = ably.channels.get(req.body.chatRoomId);
        // Publish a message to the test channel
        channel.publish('message', req.body);
        res.send(req.body)
    })
})


io.on('connection', (socket) => {
    console.log('New User Connection!')

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('نام خود و اتاق موردنظر را وارد کنید!')
        }

        socket.join(params.room)
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room).then((user) => {
            console.log(user.name + " is adddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeddddddddddddddddddddd");
        })

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
        callback();
    })

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    })
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    })
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left!`))
        }
    })
})


var sendPush = async (req, res) => {
    const registrationToken = req.body.registrationToken
    // const options =  notification_options


    var message = {
        data: {
            message: req.body.message,
            score: '850',
            time: '2:45'
        },
        //  token: registrationToken
    };

// Send a message to the device corresponding to the provided
// registration token.
    /*    admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });*/


    await admin.messaging().sendToDevice(registrationToken, message)
        .then(response => {
            // res.status(200).send("Notification sent successfully")
            // console.log('okay');
            return true;
        })
        .catch(error => {
            console.log(error);
            return false
        });
}


server.listen(port, '0.0.0.0', () => {
    console.log(`Server is up on ${port}`)
})

app.post('/api/create/user2', (req, res) => {
    var received = req.body;


})


