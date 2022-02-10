import axios from 'axios';
axios.defaults.baseURL = 'https://app-api.ryoii.io';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios;
