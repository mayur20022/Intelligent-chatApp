import 'dotenv/config'
import http from 'http'
import app from './app.js'
import { Server } from "socket.io";

const port = process.env.PORT || 3000




const server = http.createServer(app)
const io = new Server(server);

io.use((socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        console.log(token);
        
        if (!token) {
            return next(new Error('Authentication error'));
        } 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        if (!decoded) {
            return next(new Error('Authentication error'));
        }
        socket.user = decoded; // Attach user info to socket
        next();
        
    } catch (error) {

        console.error('Authentication error:', error);
        next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
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