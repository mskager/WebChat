function cmdparse(io,socket,usersocketid, msg) {
	words = msg.split(" ");
	if(words.length <= 0) {
		return false;
	}
	if(words[0] === "/msg" && words.length >= 3) {
		if(usersocketid[words[1]]) {
			var message = "";
			for(var i = 2; i < words.length; i++) {
				message = message + " " + words[i];
			}
			io.sockets.socket(usersocketid[words[1]]).emit('updatechat', 'Private from ' + socket.username, message);
			io.sockets.socket(usersocketid[socket.username]).emit('updatechat','Private to ' +  words[1], message);
		} else {		
			io.sockets.socket(usersocketid[socket.username]).emit('updatechat','SERVER', 'Who the hell?');
		}
	return true;
	}
	return false;
}

exports.parse_message = cmdparse;
