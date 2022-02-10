import { URLS } from '@/constants/';
// TODO namespaced store

export const state = () => ({
  users: [],
  discs: [],
})

export const getters = {
  getUsers(state) {
    return state.users;
  },

  getDiscs(state) {
    return state.discs;
  }
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },

  SET_DISCS(state, discs) {
    state.discs = discs;
  }
}

export const actions = {
  loadUsers({ commit }) {
    this.$axios.$get(URLS.GET_USERS)
      .then(resp => commit('SET_USERS', resp));
  },

  loadDiscs({ commit }) {
    this.$axios.$get(URLS.GET_DISCS)
      .then(resp => commit('SET_DISCS', resp));
  }
}
