var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var o = require('odata');
var request = require('request');

app.use(bodyParser.json());

var port = process.env.PORT || '8080';
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true})); 

o().config({
  // format: 'json',
  username: 'FSANCHEZ', 	// the basic auth username
  password: 'Welcome1.',
  isWithCredentials: true
});

app.get('/', function(req, res) {
	res.render('login');
});

app.get('/bienvenido',function(req,res){
	res.render('bienvenido');
});

app.listen(port, function(req,res){
   console.log("Servidor Corriendo en puerto: " + port); 
});