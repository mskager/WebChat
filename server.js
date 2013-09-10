/**
Modules
 */

var chatServer = require('./lib/chat_server.js');
var express = require('express')
	, http = require('http')
	,	io = require('socket.io')
	, routes = require('./routes')
	, path = require('path');

var app = express();


// all environments
app.set('port', 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.static(__dirname + '/public'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.get('/', routes.login); 
app.get('/chat', routes.chat);


app.post('/chat', function(req, res){
	console.log(req.body);
});


var server = http.createServer(app);
chatServer.start(io.listen(server));
server.listen(app.get('port'));

