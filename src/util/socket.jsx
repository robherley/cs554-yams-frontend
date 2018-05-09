import io from 'socket.io-client';
import { toastr } from 'react-redux-toastr';
import * as auth from '../util/auth';

let socket;

export let connect = () => {
   socket = io(window.require('process').env.YAMS_BACKEND, {
      query: {
         jwt: auth.getToken()
      }
   });
   socket.on('connect', () => {
      console.log('Connected to Socket Server!');
   });
   socket.on('msg', msg => console.log(msg));
   socket.on('disconnect', () =>
      console.log('Disconnected from Socket Server!')
   );
   socket.on('err', err => {
      console.error('Socket Error!', err);
      toastr.error('Socket Error!', err);
   });
};

export let sendMsg = (group, body) => {
   socket.emit('send', {
      group,
      body
   });
};

export let disconnect = () => {
   socket.disconnect();
};
