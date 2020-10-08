const path = require('path');
const express = require('express')
const socketIO = require('socket.io')
const http = require('http');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '../public')
var app = express();
var server = http.createServer(app)
var io = socketIO(server)
const mongoose = require('mongoose');
const _ = require('lodash')
mongoose.Promise = global.Promise
var loginRouter = require('./api/login')
var uploadRouter = require('./api/upload')
var getUserRouter =require('./api/pagination/getuser')
var Ibm =require('./api/IBM')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: false})); // support encoded bodies
app.use('/', loginRouter);
app.use('/', uploadRouter);
app.use('/', getUserRouter);
app.use('/', Ibm);

app.use(express.static(publicPath))
module.exports = {
    _,
    app,
    server,
    io,
    mongoose
}