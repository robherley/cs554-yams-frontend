import io from 'socket.io-client';
import { toastr } from 'react-redux-toastr';
import { store } from '../index';
import { loadUserChats } from '../actions/chats.actions';
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
   socket.on('recieve', msg => {
      new Notification(`New message from ${msg.sentBy} in ${msg.chat}`, {
         title: 'testing',
         body: msg.content
      });
      store.dispatch(loadUserChats());
   });
   socket.on('disconnect', () =>
      console.log('Disconnected from Socket Server!')
   );
   socket.on('err', err => {
      console.error('Socket Error!', err);
      toastr.error('Socket Error!', err);
   });
};

export let sendMsg = (chatId, body, media) => {
   socket.emit('send', {
      chatId,
      body,
      media
   });
};

export let disconnect = () => {
   socket.disconnect();
};
