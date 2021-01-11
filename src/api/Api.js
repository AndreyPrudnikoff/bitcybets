import axios from 'axios';

// let BaseApi = axios.create({baseURL: 'http://localhost:3000'});
let BaseApi = axios.create();

let Api = function() {
  let token = localStorage.getItem('token');

  if (token) {
    BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return BaseApi;
};

export default Api;