import * as types from './actionTypes';
import * as auth from '../util/auth';
import { toastr } from 'react-redux-toastr';
import yams from '../util/fetchYams';

const notiErrors = ({ error }) => {
   // error.forEach(e => {
   //    toastr.error('Error!', e.msg);
   // });

   // Let's only do one error at a time
   toastr.error('Error!', error[0].msg);
};

export let login = (username, password) => {
   return async dispatch => {
      try {
         const { data } = await yams.post('/api/v1/user/login', {
            username,
            password
         });
         auth.authorize(data.token);
         toastr.success('Login Success!', 'Now logging in...');
         dispatch({
            type: types.AUTHENTICATE,
            payload: data.token
         });
      } catch (err) {
         notiErrors(err.response.data);
      }
   };
};

export let register = regObj => {
   return async dispatch => {
      try {
         const { data } = await yams.post('/api/v1/user/register', regObj);
         toastr.success('Registration Success!', 'Now logging in...');
         const res = await yams.post('/api/v1/user/login', {
            username: regObj.username,
            password: regObj.password
         });
         auth.authorize(res.data.token);
         dispatch({
            type: types.AUTHENTICATE,
            payload: res.data.token
         });
      } catch (err) {
         notiErrors(err.response.data);
      }
   };
};

export let logout = () => {
   return dispatch => {
      auth.deauthorize();
      dispatch({
         type: types.DEAUTHENTICATE
      });
   };
};
