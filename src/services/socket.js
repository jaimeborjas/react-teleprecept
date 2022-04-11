import io from 'socket.io-client';
import endPoints from './api';

const socket = io('http://localhost:3000');
socket.on('connect', () => {
  console.log('connected');
});
socket.on('message', (message) => {
  console.log(message);
});
export default socket;
