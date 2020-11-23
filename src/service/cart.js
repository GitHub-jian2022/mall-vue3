import axios from '../utils/axios'

export function addCart(params) {
  return axios.post('/cart', params);
}

export function getCart(params) {
  return axios.get('/cart', { params });
}

export function getCartCount(params) {
  return axios.get('/cart/count', { params });
}

export function deleteCartItem(data) {
  console.log('data: ', data);
  return axios({
    url: '/cart',
    method: 'delete',
    data
  })
}

