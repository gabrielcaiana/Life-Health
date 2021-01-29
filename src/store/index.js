import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/http'

Vue.use(Vuex)

const state = {
	token: localStorage.getItem('token') || '',
	user: {}
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
	}
}

const actions = {
	efetuarLogin({ commit }, user) {
		return new Promise((resolve, reject) => {
			http.post('auth/login', user)
			.then((response) => {
				commit("DEFINE_USER_LOGIN",{
					token: response.data.access_token,
					user: response.data.user
				})
				localStorage.setItem('token', response.data.access_token)
				resolve(response.data)
			})
			.catch((err) => {
				console.log(err)
				reject(err)
			})
		})
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

