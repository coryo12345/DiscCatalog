export const state = () => ({
  users: [],
})

export const getters = {
  getUsers(state) {
    return state.users;
  }
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  }
}

export const actions = {
  loadUsers({ commit }) {
    this.$axios.$get('/users')
      .then(resp => commit('SET_USERS', resp));
  }
}
