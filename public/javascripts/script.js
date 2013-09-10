$(document).ready(function() {
var socket = io.connect('http://localhost:1337/chat');
	// on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)	
		console.log(username + "hej");
		var username = getQueryParameter("User");
		socket.emit('adduser', username);
		});

	// When client emits updatechat
	socket.on('updatechat', function(username, msg) {
		// Update chat conversation window
		$('#chat_conversation').append('<b>' + username + ': <b>' + msg + '<br>');
	});
	
	socket.on('updateusers', function(usernames) {
		$('#users').empty();
		$.each(usernames, function (key,value) {
			$('#users').append('<div>' + value + '</div>');
		});
	});
}

$('#sendbutton').click( function() {
	var message = document.getElementById('msginput').value;
	document.getElementById('msginput').value = '';
	socket.emit('sendchat', message);
});

$('#msginput').keypress(function(e) {
	if(e.keyCode === 13) {
		$(this).blur();
		$('#sendbutton').focus().click();
	}
});

$('#loginbutton').click( function() {
	var name = document.getElementById('logininput').value;
	socket.emit('login', name);
});

function getQueryParameter(nameOfParam) {
	name = name.replace(/[/[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponant(results[1].replace(/\+/g, " "));
}
