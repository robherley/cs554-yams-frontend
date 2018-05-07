import * as types from './actionTypes';
import * as auth from '../util/auth';
import yams from '../util/fetchYams';

export let loadUserInfo = () => {
   return async dispatch => {
      try {
         const { data } = await yams.get('/api/v1/user/about', {
            headers: {
               Authorization: `Bearer ${auth.getToken()}`
            }
         });
         dispatch({
            type: types.LOAD_USER,
            payload: data
         });
      } catch (err) {
         console.error(err);
      }
   };
};
