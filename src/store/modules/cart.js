import { getCartCount } from '../../service/cart'

export default {
  namespaced: true,
  state: {
    cartCount: 0
  },

  mutations: {
    addCart (state, payload) {
      state.cartCount = payload.count
    }
  },

  actions: {
    async updateCartCount({ commit }) {
      const { data } = await getCartCount()
      // console.log('data: ', data);
      commit('addCart', {
        count: data.count || 0
      })
    }
  },
}