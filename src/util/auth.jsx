export let isAuthorized = () => {
   return !!localStorage.getItem('jwt_token');
};

export let getToken = () => localStorage.getItem('jwt_token');

export let authorize = token => {
   localStorage.setItem('jwt_token', token);
};

export let deauthorize = () => {
   localStorage.removeItem('jwt_token');
};
