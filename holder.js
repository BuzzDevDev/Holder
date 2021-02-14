const { createShort } = require("@ksplat/easytoken");
const EasyToken = require("@ksplat/easytoken");
const fs  = require("fs")
const { String } = require("./utils/hash/hash");


var options = {
    characters: "ABC123",
    base64Encode: true,
    length: 22
};

function createKey() {
    var apikey = EasyToken.createToken(options);
    var passphrase = EasyToken.createToken(options).hexEncode();
    passphrase = Buffer.from(passphrase).toString('base64');
    var obj = {
        apikey: apikey,
        passphrase: passphrase
    };
    console.log(obj);
};

createKey();

function getKey(passphrase) {
    
};

function getFile(options) {
    options = options || {

    };
};

module.exports = {
    getFile: getFile,
    getKey: getKey
};