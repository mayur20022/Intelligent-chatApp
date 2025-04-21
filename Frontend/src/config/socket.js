import { io } from 'socket.io-client';

let socketInstance = null;

export const initialiseSocket = (projectID) => {
    socketInstance = io(import.meta.env.VITE_API_URL, {
        transports: ['websocket'],
        auth: {
            token: localStorage.getItem('token'),
        },
        query: {
            projectId: projectID,
        },
    });

    return socketInstance;
};

export const resetSocket = (eventName, cb) => {
    if (!socketInstance) {
        console.error('Socket instance is not initialized');
        return;
    }
    socketInstance.on(eventName, cb);
};

export const getSocket = (eventName, data) => {
    if (!socketInstance) {
        return console.error('Socket instance is not initialized');
    }
    socketInstance.emit(eventName, data);
};
