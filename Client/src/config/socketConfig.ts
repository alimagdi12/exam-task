import { io } from 'socket.io-client';

// Create a socket connection to your backend
const socket = io('http://localhost:5000', {
  transports: ['websocket'], 
});

export const setupSocket = () => {
  // Add event listeners
  socket.on('exam added', (data) => {
    console.log('New exam added: ', data);
  });

};

export default socket;
