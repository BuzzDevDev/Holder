/**
 * @license MIT MIT License
 * @author Bleart Emini
 * 
 */




const EasyToken = require("@ksplat/easytoken");
const { jsonReader } = require("./utils/jsonreader")
const fs  = require("fs");
const { String } = require("./utils/hash/hash");


var options = {
    characters: "ABC123",
    base64Encode: true,
    length: 22
};

/**
 * 
 * @param {} file An object, string, number, or anything that needs to be written to a file.
 * @param {String} fileType JSON or txt.
 * @description Returns an object with your api key and passphrase. Creates a file with the data passed that can be requested with your api key.
 */

function create(file, fileType) {
    var apikey = EasyToken.createToken(options);
    var passphrase = EasyToken.createToken(options).hexEncode();
    var obj = {
        apikey: apikey,
        passphrase: passphrase
    };
    return obj;
};

/**
 * 
 * @param {String} passphrase Your passphrase that you got by creating your key and passpharse.
 * @description The gets your passpharse and returns a key from it. Used if you forgot your key.
 */

function getKey(passphrase) {
    var name = passphrase.decode();
    jsonReader('./keys/keys.json', (err, data) => {
        if(err) {
            console.log('Error reading file:', err)
            return;
        };

        if(data.hasOwnProperty(name)) {
            return data[name].key;
        };
        
        return console.log("Passphrase not found.");
    });
};

function reqFile(options) {
    options = options || {

    };
};

module.exports = {
    reqFile: reqFile,
    getKey: getKey,
    create: create
};