const express = require('express');
const app = express();
const server = require('http').Server(app);
const fs = require('fs');
const { jsonReader } = require("./utils/jsonreader")

var port = process.env.PORT || 8080;


app.use(express.urlencoded({
    extended: true
}));

app.get('/api/:id/:name', (req, res) => {
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

    console.log(found)
    console.log(nameFound)
    
    if(found == true && nameFound == true) {
        var data = jsonReader(`./keys/${name}.json`)
        res.send(data);
        res.end();
    }else{
        res.send("Api key and/or Name does not match.")
    };
    
    res.end();
});

// use webpage file index.html in /public/
app.use(express.static(__dirname + '/public/'));


server.listen(port);