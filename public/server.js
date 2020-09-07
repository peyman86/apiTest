const path = require('path');
const express = require('express')
const socketIO = require('socket.io')
const http = require('http');
const bodyParser=require('body-parser');

var {generateMessage, generateLocationMessage} = require('../server/utils/message')
var {isRealString} = require('../server/utils/validation')
const publicPath = path.join(__dirname, '../public')
const port = 3000;
const {Users} = require('../server/utils/user')
var app = express();
var server = http.createServer(app)
var io = socketIO(server)
var loginRouter= require('../api/login')
var uploadRouter= require('../api/upload')
var users = new Users();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.use('/', loginRouter);
/*var uploader = require('express-fileupload');
app.use(uploader());*/
app.use('/', uploadRouter);

//Broadcasting event

io.on('connection', (socket)=>{
    console.log('New User Connection!')

    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('نام خود و اتاق موردنظر را وارد کنید!')
        }

        socket.join(params.room)
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room).then((user)=>{
         console.log(user.name+" is adddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeddddddddddddddddddddd");
        })

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
        callback();
    })

    socket.on('createMessage', (message, callback)=>{
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    })
    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    })
    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left!`))
        }
    })
})

app.post('/uploads',(req,res)=>{
    var object =req.files.firstImage;
    object.mv('./../uploads/'+object.name,(err)=>{
        if (err){
            res.send(err)
        }else{
            res.send('done');
        }
    });
    //  res.send('./'+req.uploads.firstImage.filename);
    console.log(req.files);

})
/*
app.get('/login',(req,res)=>{
    res.send('received');
})
*/

app.use(express.static(publicPath))


server.listen(port, ()=>{
    console.log(`Server is up on ${port}`)
})

app.post('/api/create/user2', (req, res) => {
    var received = req.body;


})


