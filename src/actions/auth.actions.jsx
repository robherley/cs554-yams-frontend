import * as types from './actionTypes';
import * as auth from '../util/auth';
import { toastr } from 'react-redux-toastr';
import yams from '../util/fetchYams';

const notiErrors = ({ error }) => {
   // Let's only do one error at a time
   toastr.error('Error!', error[0].msg);
};

export let login = (username, password) => {
   return async dispatch => {
      try {
         const { data } = await yams.post('/user/login', {
            username,
            password
         });
         auth.authorize(data.token);
         toastr.success('Logging In...');
         dispatch({
            type: types.AUTHENTICATE,
            payload: data.token
         });
      } catch (err) {
         notiErrors(err.response.data);
         auth.deauthorize();
         dispatch({
            type: types.DEAUTHENTICATE
         });
      }
   };
};

export let register = regObj => {
   return async dispatch => {
      try {
         const { data } = await yams.post('/user/register', regObj);
         toastr.success('Registration Success!', 'Now logging in...');
         const res = await yams.post('/user/login', {
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
         auth.deauthorize();
         dispatch({
            type: types.DEAUTHENTICATE
         });
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
