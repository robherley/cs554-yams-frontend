import axios from 'axios';

export default axios.create({
   baseURL: window.require('process').env.YAMS_BACKEND + '/api/v1'
});
