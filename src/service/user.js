import axios from '../utils/axios'

export function getUserInfo() {
  return axios.get('/user');
}

export function EditUserInfo(params) {
  return axios.post('/user', params);
}

export function login(params) {
  return axios.post('/login', params);
}

export function logout() {
  return axios.post('/user/logout')
}

export function register(params) {
  return axios.post('/register', params);
}

