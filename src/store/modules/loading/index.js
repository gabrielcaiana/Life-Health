export const namespaced = true;

export const state = {
	loading: false
}

export const mutations = {
  SET_LOADING(state, isVisible) {
    state.loading = isVisible
  },
}

export const actions = {
  setLoading({commit}, isVisible) {
    commit('SET_LOADING', isVisible)
  },
}