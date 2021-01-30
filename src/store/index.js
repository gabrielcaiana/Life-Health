import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/http'

Vue.use(Vuex)

const state = {
	token: localStorage.getItem('token') || '',
  user: {},
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

  SET_SNACK_BAR(state, {msg, success = true}) {
    state.snackbar = {color: success ? 'sucess' : 'error', msg, visible: true}
  }
}

const actions = {
	efetuarLogin({ commit, dispatch }, user) {
		return new Promise((resolve, reject) => {
			http.post('auth/login', user)
			.then((response) => {
        dispatch('setSnackBar', {msg: 'Login Efetuado com sucesso'})
				commit("DEFINE_USER_LOGIN",{
					token: response.data.access_token,
					user: response.data.user
				})
				localStorage.setItem('token', response.data.access_token)
				resolve(response.data)
			})
			.catch((err) => {
        dispatch('setSnackBar', {msg: 'Email ou senha incorretos', success: false})
				console.log(err)
				reject(err)
			})
		})
  },

  setSnackBar({commit}, {msg, success = true}) {
    commit('SET_SNACK_BAR', {msg, success})
  }
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

