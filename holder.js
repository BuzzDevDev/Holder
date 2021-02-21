/**
 * @license MIT MIT License
 * @author Bleart Emini
 * @description Holds temperary files and more to be requested with an api key.
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
 * @param {} fileData An object, string, number, or anything that needs to be written to a file.
 * @param {String} fileType The file type that the data is saved to.
 * @description Returns an object with your api key and passphrase. Creates a file with the data passed that can be requested with your api key.
 */

function create(fileData, fileType) {
    var apikey = EasyToken.createToken(options);
    var passphrase = EasyToken.createToken(options).hexEncode();
    var name = passphrase.decode();
    var obj = {
        apikey: apikey,
        passphrase: passphrase,
        name: name
    };

    // edit keys.json file
    var data = jsonReader("./keys/keys.json")
    data.keys += 1;
    data.keyList.push(apikey);
    data[name] = obj;
    fs.writeFileSync("./keys/keys.json", JSON.stringify(data));

    // create json file
    fs.writeFileSync(`./keys/${name}.${fileType}`, JSON.stringify(fileData));

    return obj;
};

/**
 * 
 * @param {String} passphrase Your passphrase that you got by creating your key and passpharse.
 * @description The gets your passpharse and returns a key from it. Used if you forgot your key.
 */

function getKey(passphrase) {
    var name = passphrase.decode();
    var data = jsonReader('./keys/keys.json');
    
    if(data.hasOwnProperty(name)) {
        return data[name].key;
    }else{
       return false;
    };
};


module.exports = {
    getKey: getKey,
    create: create
};