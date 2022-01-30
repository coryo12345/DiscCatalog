// TODO namespaced store

export const state = () => ({
  users: [],
  discs: [],
  stores: [],
})

export const getters = {
  getUsers(state) {
    return state.users;
  },

  getDiscs(state) {
    return state.discs;
  },

  getStores(state) {
    return state.stores;
  },
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },

  SET_DISCS(state, discs) {
    state.discs = discs;
  },

  SET_STORES(state, stores) {
    state.stores = stores;
  }
}

export const actions = {
  loadUsers({ commit }) {
    this.$axios.$get('/api/user/users')
      .then(resp => commit('SET_USERS', resp));
  },

  loadDiscs({ commit }) {
    this.$axios.$get('/api/disc/discs')
      .then(resp => commit('SET_DISCS', resp));
  },

  loadStores({ state, commit }) {
    if (!state.stores.length) {
      this.$axios.$get('/api/store/stores')
      .then(resp => commit('SET_STORES', resp));
    }
  }
}
