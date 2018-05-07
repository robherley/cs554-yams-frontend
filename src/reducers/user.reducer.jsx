import * as types from '../actions/actionTypes';
import initialStore from '../store/initialStore';

export default (state = initialStore.user, action) => {
   switch (action.type) {
      case types.LOAD_USER:
         return action.payload;
      default:
         return state;
   }
};
