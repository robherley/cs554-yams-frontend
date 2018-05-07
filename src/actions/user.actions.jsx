import * as types from './actionTypes';
import yams from '../util/fetchBack';

export let loadUserInfo = () => {
   return async dispatch => {
      try {
         const { data } = await yams.get('/test');
         dispatch({
            type: types.LOAD_USER,
            payload: data.msg
         });
      } catch (err) {
         console.error(err);
      }
   };
};
