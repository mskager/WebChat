var command_parser = require('./command_parser.js');
var guestNumber = 1
	, nickNames = {}
	, namesUsed = {}
	, currentRoom = {};

exports.start =  function(io) {
	handleConnections(io);
	console.log('Chat server is listening');
};

function handleConnections(io) {

	io.sockets.on('connection', function (socket) {

	// When client emits sendchat
	socket.on('sendchat', function(msg) {
		// Checks input for special commands
		if(!command_parser.parse_message(io,socket,usersocketid, msg)) {
			// Tell all clients to update chat conversation with given username and message		
			if(socket.username) {
				io.sockets.emit('updatechat', socket.username, msg);
			}
		}
		});

	
	//When the client emits 'adduser'
	socket.on('adduser', function (username) {
		console.log("ADDING USER:" + username);
		socket.username = username;
		usersocketid[username] = socket.id;
		console.log(usersocketid);
		if(socket.username) {		
			usernames[socket.username] = username;
			update_msg = 'The user ' + username
			io.sockets.emit('updatechat','SERVER', username + ' has connected.');
			io.sockets.emit('updateusers', usernames);
		}
	});


	//When the client disconnects
	socket.on('disconnect', function(){
		delete usernames[socket.username];
		delete usersocketid[socket.username];
		io.sockets.emit('updateusers', usernames);
		io.sockets.emit('updatechat', 'SERVER', socket.username + ' has disconnected.');
	});
	});	
}


// Usernames to users currently connected to chat
var usernames = {};
var usersocketid = {};
