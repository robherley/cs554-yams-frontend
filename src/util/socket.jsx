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
   socket.on('recieve', async msg => {
      if (store.getState().user.username !== msg.sentBy) {
         new Notification(`New message from ${msg.sentBy} in ${msg.chat}`, {
            body: msg.content
         });
      }
      store.dispatch(loadUserChats());
   });
   socket.on('newchat', msg => {
      new Notification(`You were added to ${msg.chat}`);
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

export let newChat = (chat, users) => {
   socket.emit('addchat', {
      chat,
      users
   });
};

export let disconnect = () => {
   if (socket.connected) socket.disconnect();
};
