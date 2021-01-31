import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/http'

Vue.use(Vuex)

const state = {
	token: localStorage.getItem('token') || '',
  user: {},
  loading: false,
  snackbar: {
    visible: false,
    color: '',
    msg: ''
  }
}

const mutations = {
	DEFINE_USER_LOGIN(state, {token, user}) {
		state.token = token,
		state.user = user
	},

	DEFINE_LOGOUT(state) {
		state.token = null,
		state.user = {},
		localStorage.removeItem('token')
  },

  SET_LOADING(state, isVisible) {
    state.loading = isVisible
  },

  SET_SNACK_BAR(state, {msg, success = true}) {
    state.snackbar = {color: success ? 'sucess' : 'error', msg, visible: true}
  }
}

const actions = {

  setLoading({commit}, isVisible) {
    commit('SET_LOADING', isVisible)
  },

  setSnackBar({commit}, {msg, success = true}) {
    commit('SET_SNACK_BAR', {msg, success})
  },

	async efetuarLogin({ commit, dispatch }, user) {
    try {
      dispatch('setLoading', true)
      const { data } = await http.post('auth/login', user)
      commit("DEFINE_USER_LOGIN",{
        token: data.access_token,
        user: data.user
      })
      dispatch('setSnackBar', {msg: 'Login Efetuado com sucesso'})
      localStorage.setItem('token', data.access_token)
    } catch(err) {
      dispatch('setSnackBar', {msg: 'Email ou senha incorretos', success: false})
    } finally {
      dispatch('setLoading', false)
    }
  },
}

// const getters = {
// 	userLogin: state => Boolean(state.token)
// }

export default new Vuex.Store({
	state,
	mutations,
	actions,
	// getters
})

