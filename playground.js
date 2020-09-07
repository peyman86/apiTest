var jswonwebtoken = require('jsonwebtoken');
var token ='pZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJpc19wcml2YXRlX2VtYWlsIjoidHJ1ZSIsImF1dGhfdGltZSI6MTU5OTA2NTU3OSwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.CaZdtIQIkdb5di9mi_1rvJC6tK1YcqCrNxzxsCNWvUBRi-9Yy-GyNVyobarfvTqEElfY080AyW7wfRTKpbKjKwvbP3vhojNSN3eUZzfa4EMKp2wgsM4C9_pZvSObpit7oA9HMEm2CImdr3iqQo0QY9ROKF3buhTZcDJ5BvnaZovL4GRAZj0wSR424ooMss_Xc-Mw4HW_7aYSjSj8RNEflTHM2OQ77TOsgi-Pf8BKvsCdm5vx1rsVvqVVqk65rq7E4gMXT_zU77Do-tqzeWxF_dq3CNmnBRBPVTdabcls3biWljX0z6gUfidESShs6bSpEd2PPQ07nsXp_ULYBEhcnA\n'
/*var data =jswonwebtoken.verify(token
    ,
    'MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgNjF0/RBIQcWGEXPG\n' +
    '3q5IeiQQBka+hHW/VSUkORXZwvKgCgYIKoZIzj0DAQehRANCAASl/7VlBMoNEKqT\n' +
    'ZfA9UFhOf3dkiqEu1RMYpHMQwDwhGaQhqoWhusiTtLYhHEzsJtkfFED0/DK88bnH\n' +
    'z5cxENur')*/

var data =jswonwebtoken.verify('pZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJpc19wcml2YXRlX2VtYWlsIjoidHJ1ZSIsImF1dGhfdGltZSI6MTU5OTA2NTU3OSwibm9uY2Vfc3VwcG9ydGVkIjp0cnVlfQ.CaZdtIQIkdb5di9mi_1rvJC6tK1YcqCrNxzxsCNWvUBRi-9Yy-GyNVyobarfvTqEElfY080AyW7wfRTKpbKjKwvbP3vhojNSN3eUZzfa4EMKp2wgsM4C9_pZvSObpit7oA9HMEm2CImdr3iqQo0QY9ROKF3buhTZcDJ5BvnaZovL4GRAZj0wSR424ooMss_Xc-Mw4HW_7aYSjSj8RNEflTHM2OQ77TOsgi-Pf8BKvsCdm5vx1rsVvqVVqk65rq7E4gMXT_zU77Do-tqzeWxF_dq3CNmnBRBPVTdabcls3biWljX0z6gUfidESShs6bSpEd2PPQ07nsXp_ULYBEhcnA','aaaa')

console.log(data)


var varName = "peyman"
let letName = "peyman"
const constName = "peyman"

var varName = "ali"
letName = "ali"
//constName = "ali"

console.log(varName + "  " + letName + "   " + constName)