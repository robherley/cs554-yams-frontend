import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import user from './user.reducer';
import auth from './auth.reducer';
import chats from './chats.reducer';

const rootReducer = combineReducers({
   user,
   auth,
   chats,
   toastr
});

export default rootReducer;
