const holder = require("../holder");

var options = {
    apikey: "Your api key",
    fileType: "json"
};

var json = 
{
    "myData": ["foo", "bar"]
};

// returns an object with your apikey and passphrase
// creates your json or other file with your data on it

var myObj = holder.create(json, "json");

// Forgot your API key? Get your key with your passphrase.
// Returns your api key
var myKey = holder.getKey("00530055003100760054004700460074006100580070006c00510032003500560057006c0059007a0056006d0030007900540033004e003200530041003d003d"); 

console.log(myKey);