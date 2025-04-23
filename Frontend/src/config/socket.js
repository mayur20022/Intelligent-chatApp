import { io } from 'socket.io-client';

let socketInstance = null;

export const initialiseSocket = (projectId) => {
    socketInstance = io(import.meta.env.VITE_API_URL, {
        transports: ['websocket'],
        auth: {
            token: localStorage.getItem('token'),
        },
        query: {
            projectId
        },
    });

    return socketInstance;
};

export const recivetSocket = (eventName, cb) => {
    socketInstance.on(eventName, cb);
};

export const getSocket = (eventName, data) => {
    socketInstance.emit(eventName, data);
};
