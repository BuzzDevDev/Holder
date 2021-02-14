const holder = require("../holder");

var options = {
    apikey: "Your api key",
    fileType: "json"
};

holder.getFile(options);

// Forgot your API key? Get your key with your passphrase.

holder.getKey("Your passphrase"); // Returns your api key