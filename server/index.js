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

let serveruserArray = [];
let serverroomArray = [];
let serveruseridArray = [];


io.on('connection', (socket) => {
    console.log('A connection was established', socket.id);
    // console.log(socket.rooms)

    socket.on('joinroom', ({ msg, room, userName, type, time }) => {
        socket.join(room);
        console.log('inside join room')
        for (let user of serveruserArray) {
            serveruseridArray.push(user.socket_id);
        }
        serverroomArray = [];
        for (let key of socket.adapter.rooms.keys()) {
            if (!serveruseridArray.includes(key)) {
                serverroomArray.push({ roomname: key });
            }
        }
        console.log(`User ${userName} joined room: ${room}`);
        io.emit('servermessage', { msg, room, userName, type, time, serveruserArray, serverroomArray });
    });

    socket.on('clientmessage', ({ msg, room, userName, type, time }) => {

        if (type === 'join') {
            serveruserArray.push({ userName: userName, socket_id: socket.id });
            socket.username = userName;
            console.log(`${socket.id} has taken username: ${userName}`);
        }
        console.log('inside client message')
        for (let user of serveruserArray) {
            serveruseridArray.push(user.socket_id);
        }
        serverroomArray = [];
        for (let key of socket.adapter.rooms.keys()) {
            if (!serveruseridArray.includes(key)) {
                serverroomArray.push({ roomname: key });
            }
        }

        if (room)
            io.to(room).emit('servermessage', { msg, room, userName, type, time, serveruserArray, serverroomArray });
        else {
            io.emit('servermessage', { msg, userName, room, type, time, serveruserArray, serverroomArray });
        }
    });

    socket.on('disconnect', () => {
        let index = serveruserArray.findIndex(user => user.userName === socket.username);
        if (index !== -1) {
            serveruserArray.splice(index, 1);
        }
        console.log('inside disconnect')
        for (let user of serveruserArray) {
            serveruseridArray.push(user.socket_id);
        }
        serverroomArray = [];
        for (let key of socket.adapter.rooms.keys()) {
            if (!serveruseridArray.includes(key)) {
                serverroomArray.push({ roomname: key });
            }
        }

        io.emit('servermessage', { msg: '', userName: socket.username, type: 'leave', room: '', serveruserArray, serverroomArray });
        console.log('User disconnected', socket.id);
    });


});

app.get('/', (req, res) => {
    res.send('This is our server');
})

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
