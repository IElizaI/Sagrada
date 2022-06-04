import { io } from 'socket.io-client';

const Socket = () => {
  const socket = io('ws://localhost:3001');

  return {
    join(room, callback) {
      socket.on(room, callback);
    },
    exit(room) {
      socket.off(room);
    },
  };
};

export default Socket();
