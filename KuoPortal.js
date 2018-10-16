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

app.get('/home_tremec',function(req,res){
	res.render('home_tremec');
});

app.post('/CrearPedidoVenta', function(req,res){
	pedido = req.body.pedido
	url = 'https://xs01b14ae55f1.us1.hana.ondemand.com/KUO/odata.xsodata/ventas?$select=ID_PEDIDO&$orderby=ID_PEDIDO%20desc&$top=1';

	o(url).get(function(data){
		if(typeof data.d.results[0] == 'undefined'){
			numero_nuevo = 1;
		} else {
		console.log(data.d.results[0].ID_PEDIDO);
		numero_nuevo = Number(data.d.results[0].ID_PEDIDO) + 1;
		console.log(numero_nuevo);
		}
		url2 = "https://xs01b14ae55f1.us1.hana.ondemand.com/KUO/odata.xsodata/ventas";
		fecha = new Date(req.body.FECHA)
		console.log(fecha.getTime());
		ts = fecha.getTime();
		console.log(ts);
			info = {
				"ID_PEDIDO": numero_nuevo,
				"USUARIO": req.body.USUARIO,
				"CLIENTE": req.body.CLIENTE,
				"FECHA": '/Date('+String(ts)+')/',
				"FECHA2": req.body.FECHA,
				"PRODUCTO": req.body.PRODUCTO,
				"CANTIDAD": req.body.CANTIDAD,
				"ESTATUS": req.body.ESTATUS
			};
			console.log(info);
			o(url2).post(info).save(function(data){
				console.log("Información agregada satisfactoriamente");
				res.send({"resultado":"success"});  
			}, function(status, error){
				console.error(status + " " + error);
				res.send({"resultado":"error"});  
			});
	});
});

app.get('/mispedidos',function(req,res){
	res.render('mispedidos');
});

app.post('/EliminarPedido', function(req, res){
	id_pedido = req.body.id_pedido;

	// opciones para configuración del DELETE
	var options = {
	    url: "https://xs01b14ae55f1.us1.hana.ondemand.com/KUO/odata.xsodata/ventas(" + id_pedido +")",
	    method: 'DELETE',
	    auth: {
	    'user': 'i848070',
	    'pass': 'Welcome1.'
		}
	};

	console.log(options.url);

	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 204) {
	        console.log("El status de respuesta de eliminar es: " + response.statusCode);
	        res.send({"resultado":"success"}); 
	    } else {
	    	console.log("El error de respuesta de eliminar es: " + error);
	    	res.send({"resultado":"fail"}); 
	    };
	});
});

app.post('/consultarPedidos',function(req,res){
	id_usuario = req.body.id_usuario
	url = "https://xs01b14ae55f1.us1.hana.ondemand.com/KUO/odata.xsodata/ventas?$filter=USUARIO eq '" + id_usuario + "'";
	o(url).get(function(data){
		if(typeof data.d.results[0] !== 'undefined'){
			console.log(data.d.results);
			respuesta = ({"pedidos":data.d.results,"existe":true});
			res.send({"resultado": respuesta});
		} else {
			respuesta = ({"existe":false});
			res.send({"resultado": respuesta});
		};
	});
});

app.post('/consultarPedidosPorID',function(req,res){
	console.log(req.body);
	id_pedido = req.body.id_pedido
	url = "https://xs01b14ae55f1.us1.hana.ondemand.com/KUO/odata.xsodata/ventas?$filter=ID_PEDIDO eq " + id_pedido;
	o(url).get(function(data){
		if(typeof data.d.results[0] !== 'undefined'){
			console.log(data.d.results);
			// respuesta = ({"pedido":data.d.results,"existe":true});
			res.send({
		    replies: [{
		      type: 'text',
		      content: 'La información de tu pedido es la siguiente: ',
		    }],
		    conversation: {
		      memory: { pedido: data.d.results }
		    }
		  });
		} else {
			respuesta = ({"existe":false});
			res.send({"resultado": respuesta});
		};
	});
});

app.post('/EliminarPedidoRecast', function(req, res){
	id_pedido = req.body.id_pedido;

	// opciones para configuración del DELETE
	var options = {
	    url: "https://xs01b14ae55f1.us1.hana.ondemand.com/KUO/odata.xsodata/ventas(" + id_pedido +")",
	    method: 'DELETE',
	    auth: {
	    'user': 'i848070',
	    'pass': 'Welcome1.'
		}
	};

	console.log(options.url);

	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 204) {
	        console.log("El status de respuesta de eliminar es: " + response.statusCode);
	        res.send({
		    replies: [{
		      type: 'text',
		      content: 'Tu pedido ha sido eliminado satisfactoriamente. ¿Te puedo ayudar en algo más?',
		    }]
		  }); 
	    } else {
	    	console.log("El error de respuesta de eliminar es: " + error);
	    	res.send({"resultado":"fail"}); 
	    };
	});
});

app.listen(port, function(req,res){
   console.log("Servidor Corriendo en puerto: " + port); 
});

