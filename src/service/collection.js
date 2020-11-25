import axios from '../utils/axios'

export function addCollection(params) {
  return axios.post('/collection', params);
}

export function getCollection(params) {
  console.log('params: ', params);
  return axios.get('/collection', { params });
}

//是否收藏了商品,返回count:0未收藏
export function getCollectionCountByGoodsId(goodsId) {
  return axios.get(`/collection/count/${goodsId}`);
}

export function deleteCollection(data) {
  console.log('data: ', data);
  return axios({
    url: '/collection',
    method: 'delete',
    data
  })
}

export function deleteCollectionByGoodsId(data) {
  return axios({
    url: '/collection/goodsId',
    method: 'delete',
    data
  })
}

