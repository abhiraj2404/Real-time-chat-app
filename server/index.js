import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: '*'
}));

dotenv.config();
const PORT = process.env.PORT || 3000;



const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ],
        credentials: true
    }
});

let serveruserArray = [];
let serverroomArray = [];
let serveruseridArray = [];


io.on('connection', (socket) => {
    console.log('A connection was established', socket.id);

    socket.on('joinroom', ({ msg, room, userName, type, time }) => {
        // console.log(room, socket.rooms)
        let alreadyjoined = socket.rooms.has(room);
        // console.log(alreadyjoined)
        if (!alreadyjoined) {



            socket.join(room);
            for (let user of serveruserArray) {
                serveruseridArray.push(user.socket_id);
            }
            serverroomArray = [];
            for (let key of socket.adapter.rooms.keys()) {
                if (!serveruseridArray.includes(key)) {
                    serverroomArray.push({ roomname: key });
                }
            }
            if (type === 'join')
                io.to(room).emit('servermessage', { msg, room, userName, type, time, serveruserArray, serverroomArray });
            console.log(`User ${userName} joined room: ${room}`);
            io.emit('servermessage', { msg, room, userName, type: '', time, serveruserArray, serverroomArray });
        }
    });

    socket.on('clientmessage', ({ msg, room, userName, type, time }) => {

        if (type === 'join' && !room) {
            serveruserArray.push({ userName: userName, socket_id: socket.id });
            socket.username = userName;
            console.log(`${socket.id} has taken username: ${userName}`);
        }
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
            io.emit('servermessage', { msg, room, userName, type, time, serveruserArray, serverroomArray });
        }
    });

    socket.on('disconnect', () => {
        let index = serveruserArray.findIndex(user => user.userName === socket.username);
        if (index !== -1) {
            serveruserArray.splice(index, 1);
        }
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
        console.log('User disconnected', socket.username);
    });


});

app.get('/', (req, res) => {
    res.send('This is our server for deep-chat');
})

server.listen(PORT, () => {
    console.log('Server is running');
});
