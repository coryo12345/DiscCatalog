import { URLS } from '@/constants/';

export const state = () => ({
  discs: [],
})

export const getters = {
  getDiscs(state) {
    return state.discs;
  }
}

export const mutations = {
  SET_DISCS(state, discs) {
    state.discs = discs;
  }
}

export const actions = {
  loadDiscs({ commit }) {
    this.$axios.$get(URLS.GET_DISCS)
      .then(resp => commit('SET_DISCS', resp));
  }
}
