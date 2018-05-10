import * as types from './actionTypes';
import * as auth from '../util/auth';
import { toastr } from 'react-redux-toastr';
import yams from '../util/fetchYams';

const notiErrors = ({ error }) => {
   // Let's only do one error at a time
   toastr.error('Error!', error[0].msg);
};

export let loadUserChats = () => {
   return async dispatch => {
      try {
         const { data } = await yams.get('/user/chats', {
            headers: {
               Authorization: `Bearer ${auth.getToken()}`
            }
         });
         dispatch({
            type: types.LOAD_USER_CHATS,
            payload: data
         });
      } catch (err) {
         console.error(err);
      }
   };
};
