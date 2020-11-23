

export default {
  namespaced: true,
  state: {
    user: {

    }
  },

  mutations: {
    setUser (state, data) {
      state.user = data
    }
  },

  actions: {
    async updateCart({ commit }, data) {
      commit('setUser', data)
    }
  },
}