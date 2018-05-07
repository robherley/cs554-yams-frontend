import * as types from '../actions/actionTypes';
import initialState from '../store/initialStore';

export default (state = initialState.user, action) => {
   switch (action.type) {
      case types.LOAD_USER:
         return action.payload;
      default:
         return state;
   }
};
