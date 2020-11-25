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
      const res = await getCartCount()
      // console.log('res: ', res);
      const count = res.data.count || 0
      commit('addCart', {
        count
      })
    }
  },
}