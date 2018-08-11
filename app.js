const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const request = require('request');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const port = 6001
const app = express()
const url = "http://192.168.1.4:3000/"
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.static("public"));
app.use(cookieParser());

app.get('/', function (req, res) {
    res.render('github',   {
        url: url + "auth/github"
    })
})

app.get('/login', function (req, res) {
    res.render('login', {
        url: url + "explorer"
    })
})

app.post('/card', function (req, res) {
    res.render('login')
})

app.post('/selectCard', function (req, res) {
    var card = req.body.card
    var token = req.body.token;
    console.log(card);
    if (card != undefined && token != undefined) {
        var headers = {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'X-Access-Token': token
        };
        var formData = {
            type: 'formData',
            card: fs.createReadStream(__dirname + '/' + card)
        }

        request.post({url: url + 'api/wallet/import', formData, headers}, function optionalCallback(err, httpResponse, body) {
            if(err)
                res.json(err)
            res.redirect('/login');
        });
    }
})

app.post('/login', function (req, res) {

})

app.listen(6001, function () {
    console.log('app is running on port ' + port)
})