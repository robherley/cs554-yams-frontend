import * as types from '../actions/actionTypes';
import initialStore from '../store/initialStore';

export default (state = initialStore.auth, action) => {
   switch (action.type) {
      case types.AUTHENTICATE:
         return {
            token: action.payload,
            isAuth: true
         };
      case types.DEAUTHENTICATE:
         return {
            token: null,
            isAuth: false
         };
      default:
         return state;
   }
};
