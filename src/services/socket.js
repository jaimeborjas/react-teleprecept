import io from 'socket.io-client';

const socket = io('http://localhost:3002');
socket.on('connect', () => {
  console.log('connected');
});
socket.on('message', (message) => {
  console.log(message);
});
export default socket;
