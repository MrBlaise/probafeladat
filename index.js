const express = require('express');
const ExpressBrute = require('express-brute');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/*
* express-brute package hasznalata a vedelemhez.
* Meg kell adni egy store-t a létrehozáskor, erre lehet hasznalni beepitett tarolot.
* Options objectbe megadhato, hogy hanyszor probalkozhatunk ujra anelkul hogy hibat dobna.
* */
//const bruteforce = new ExpressBrute(new ExpressBrute.MemoryStore(), {freeRetries: 50});

const User = mongoose.model('User', { name: String, password: String });

require('./config/db.js')
.then(() => {

    //Sample data adatbazisba
    //require('./config/dbData')(User, "admin", "xaaaw");

    const app = express();

    app.use(bodyParser());

    app.get('/',
        (req, res, next) =>{
            return res.sendFile(__dirname + '/public/index.html');
        }
    );

    app.post('/login',

        //Megfelelo routehoz a middleware beepitese, ami 429-es hibat dob ha túl sokszor kerjuk ezt a routeot.
        //bruteforce.prevent,
        async (req, res, next) => {
            let doc = await User.findOne({ name: req.body.username });

            if(doc.password === req.body.pw){
                return res.send("success");
            }
            return res.redirect('/');
        }
    );

    app.listen(process.env.PORT || 80, (err) => {
        if(err) console.log("Error: " + err);
        console.log("Listening on: " + (process.env.PORT || 80));
    });
})
.catch((err) => {
    console.log("Failed to connect to DB: " + err);
});
