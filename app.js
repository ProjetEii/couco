
/**
 * Module dependencies.
 */
// Socket.io

var io = require('socket.io');

//Moteur de Template
var express = require('express');
var exphbs  = require('express3-handlebars');

// Crypto 
var crypto = require('crypto')
var shasum = crypto.createHash('sha1');
shasum.update("utf8");

// Var Req. Serveur.
var http = require('http');
var path = require('path');
var app = express();


// all environments
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
//app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.cookieParser());
app.use(express.session({ secret: 'super-duper-secret-secret' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Inisialitation du serveur
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Couco server listening on port ' + app.get('port'));
});

require('./routes/router_index')(app);
require('./routes/router_cours')(app);
require('./routes/router_users')(app);

io = io.listen(server);

io.on('connection', function (socket) {

	socket.on('message', function (message) {
		console.log(message);
	});

	socket.on('loginUser', function (data) {
		var loginUser = data['login'];
		var pwdUser = shasum.update(data['pwd']).digest('hex');

});

});