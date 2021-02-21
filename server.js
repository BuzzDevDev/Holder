const express = require('express');
const app = express();
const server = require('http').Server(app);
const fs = require('fs');
const { jsonReader } = require("./utils/jsonreader")
const { create } = require("./holder")

var port = process.env.PORT || 8080;


app.use(express.urlencoded({
    extended: true
}));

// get your data

app.get('/api/get/:id/:name', (req, res) => {
    var id = req.params.id;
    var name = req.params.name;
    var found = false;
    var nameFound = false;

    // Checks if name and key matches and exists

    var data = jsonReader('./keys/keys.json')

    if(data.hasOwnProperty(name)) {
        nameFound = true;
    };

    data.keyList.forEach(otherKey => {
        if(id == otherKey && nameFound == true) {
            found = true;
            console.log("Key and Name found");
        }else{
            found = false;
            console.log("Key and/or Name not found");
        };
    });
    
    if(found == true && nameFound == true) {
        var data = jsonReader(`./keys/${name}.json`)
        res.send(data);
        res.end();
    }else{
        res.send("Api key and/or Name does not match.")
    };
    
    res.end();
});

// create your api key, passphrase, name, and file to be req

app.get('/api/create/:fileData/:fileType', (req, res) => {
    var fileData = req.params.fileData;
    var fileType = req.params.fileType;

    if(fileType == "json" || fileType == "JSON") {
        var result = JSON.parse(fileData);
    };

    var obj = create(result, fileType);

    res.send("<p>Keep this data:<p> <br> <br>" + JSON.stringify(obj))
    res.end();
});




// use webpage file index.html in /public/
app.use(express.static(__dirname + '/public/'));


server.listen(port);