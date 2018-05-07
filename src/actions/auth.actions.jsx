import * as types from './actionTypes';
import * as auth from '../util/auth';
import yams from '../util/fetchYams';

export let login = (username, password) => {
   return async dispatch => {
      try {
         const { data } = await yams.post('/api/v1/user/login', {
            username,
            password
         });
         auth.authorize(data.token);
         dispatch({
            type: types.AUTHENTICATE,
            payload: data.token
         });
      } catch (err) {
         console.error(err);
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
