import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'https://vuejs-stock-trader-eca7a.firebaseio.com',
});

export const AuthInstance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
});