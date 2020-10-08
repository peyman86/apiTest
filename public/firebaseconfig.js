
var admin = require("firebase-admin");

var serviceAccount = require("./../chat-sdk-9fdf6-firebase-adminsdk-97f30-2c6a6c9e41.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-sdk-9fdf6.firebaseio.com"
})

module.exports = admin