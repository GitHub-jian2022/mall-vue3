import axios from '../utils/axios'

export function addCollection(params) {
  return axios.post('/collection', params);
}

export function getCollection(params) {
  return axios.get('/collection', { params });
}

export function getCollectionCountByGoodsId(goodsId) {
    return axios.get(`/collection/count/${goodsId}`);
  }

export function getCollectionCount(params) {
  return axios.get('/collection/count', { params });
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

