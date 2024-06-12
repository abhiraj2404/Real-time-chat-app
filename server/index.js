import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('joinroom', (room) => {
        socket.join(room);
        console.log(`User with ID: ${socket.id} joined room: ${room}`);
    });

    socket.on('clientmessage', ({ msg, room, userName }) => {
        console.log(`${userName}: ${msg}`);
        if (room)
            io.to(room).emit('servermessage', { msg, room, userName });
        else
            io.emit('servermessage', { msg, userName, room });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });


});

app.get('/', (req, res) => {
    res.send('This is our server');
})

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
