var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
res.render('pages/home');
});

app.listen(8080);