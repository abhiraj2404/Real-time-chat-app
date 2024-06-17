import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';


const app = express();
app.use(cors());
const server = createServer(app);
let userArray = [];

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);


    socket.on('joinroom', ({ userName, room }) => {
        socket.join(room);
        console.log(`User ${userName} joined room: ${room}`);
    });

    socket.on('clientmessage', ({ msg, room, userName, type, time }) => {
        userArray.push({ userName: userName, socket_id: socket.id });
        console.log(`${userName}: ${msg}`);
        if (room)
            io.to(room).emit('servermessage', { msg, room, userName, type, time });
        else {
            io.emit('servermessage', { msg, userName, room, type, time });
        }
    });

    socket.on('left', ({ userName }) => {
        console.log(`User ${userName} left the chat`);
    });

    socket.on('disconnect', () => {
        let foundUser = userArray.find(user => user.socket_id === socket.id);
        if (foundUser) {
            io.emit('servermessage', { msg: '', userName: foundUser.userName, type: 'leave', room: '' });
        }
        console.log('User disconnected', socket.id);
    });


});

app.get('/', (req, res) => {
    res.send('This is our server');
})

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
