const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// App setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static('public'));

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle chat messages
   
    socket.on('chat message', (message) => {
        io.emit('chat message', { ...message, sender: socket.id });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
});