// Server for diversify app
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io   = require('socket.io')(server);

// Sets the directory that express uses to serve files
app.use(express.static(__dirname));

// Establishes connection with client and prints to console
io.on('connection', function(client) {
  console.log('client connected');

  // Private connection for a specific match in which only 2 people have access
  // to on the RAILS API
  client.on('subscribe', function(room) {
    console.log('joining room', room);
    client.join(room);
  });

  // Sends a copy of the message through to any other clients listening to the
  // room
  client.on('send message', function(data) {
    console.log('sending message');
    console.log('sending room post', data.room);
    client.broadcast.to(data.room).emit('conversation private post', {
      message: data.message
    });
  });

  // Prints when a client is disconnected (i.e. close browser)
  client.on('disconnect', function(){
    console.log('client disconnected')
  })
});

// Sets server port at 8000
server.listen(8000, function(){
  console.log('listening on *:8000');
});
