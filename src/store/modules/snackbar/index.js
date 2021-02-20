export const namespaced = true;

export const state = {
	snackbar: {
    visible: false,
    color: '',
    msg: ''
	},
}

export const mutations = {
  SET_SNACK_BAR(state, {msg, success = true}) {
    state.snackbar = {color: success ? 'sucess' : 'error', msg, visible: true}
	},
}

export const actions = {
  setSnackBar({commit}, {msg, success = true}) {
    commit('SET_SNACK_BAR', {msg, success})
  },
}