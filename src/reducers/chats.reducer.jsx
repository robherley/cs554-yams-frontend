import * as types from '../actions/actionTypes';
import initialStore from '../store/initialStore';

export default (state = initialStore.chats, action) => {
   switch (action.type) {
      case types.LOAD_USER_CHATS:
         return action.payload;
      default:
         return state;
   }
};
