import axios from 'axios';

const isDev = window.require('process').env.NODE_ENV === 'development';

export default axios.create({
   baseURL: isDev ? 'http://localhost:3000' : 'some_prod_url'
});
