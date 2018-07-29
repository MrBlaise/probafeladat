const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789".split('');
const fs = require('fs');


for(let i = 0; i < alphabet.length; i++){
    for(let j = 0; j < alphabet.length; j++){
        let _word = alphabet[i] + "aaa" + alphabet[j];
        fs.appendFile('wordlist.txt', _word + '\n', (err) => { if(err) console.log("Error: " + err); });
    }
}