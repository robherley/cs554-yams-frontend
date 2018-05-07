import * as auth from '../util/auth';

export default {
   user: null,
   auth: {
      token: auth.getToken() || null,
      isAuth: auth.isAuthorized()
   }
};
