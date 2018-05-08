import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import user from './user.reducer';
import auth from './auth.reducer';

const rootReducer = combineReducers({
   user,
   auth,
   toastr
});

export default rootReducer;
