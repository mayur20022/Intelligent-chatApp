import 'dotenv/config'
import http from 'http'
import app from './app.js'
import { Server } from "socket.io";
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import projectModel from './models/projectModel.js'


const port = process.env.PORT || 3000




const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    },
    transports: ['websocket'],
})


io.use(async(socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        const projectId = socket.handshake.query.projectId;
        
        
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid project ID'));
        }
        socket.project = await projectModel.findById(projectId);
        
        
        
        if (!token) {
            return next(new Error('Authentication error'));
        } 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return next(new Error('Authentication error'));
        }
        socket.user = decoded; 
        next();
        
    } catch (error) {

        console.error('Authentication error:', error);
        next(new Error('Authentication error'));
    }
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.join(socket.project._id.toString())

    socket.on("project-message", (message) => {
        console.log('message: ' + message);
        socket.broadcast.to(socket.project._id.toString()).emit('project-message', message);
    })


    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
    socket.on('event', (e) => {
        console.log('message: ' + e);
        io.emit('message', e);
    })
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})