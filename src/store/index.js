import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/http'

Vue.use(Vuex)

const state = {
	token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  snackbar: {
    visible: false,
    color: '',
    msg: ''
	},
	// height: []
}

const mutations = {
  // DEFINE_REGISTER(state, {token, user}) {
  //   state.token = token,
  //   state.user = user
  // },

	DEFINE_USER_LOGIN(state, {token, user}) {
		state.token = token,
		state.user = user
	},

	DEFINE_LOGOUT(state) {
		state.token = null,
		state.user = {},
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  SET_LOADING(state, isVisible) {
    state.loading = isVisible
  },

  SET_SNACK_BAR(state, {msg, success = true}) {
    state.snackbar = {color: success ? 'sucess' : 'error', msg, visible: true}
	},
	
	// GET_HEIGHT(state, {height}) {
	// 	state.height = height
	// }
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
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.access_token)
    } catch(err) {
      dispatch('setSnackBar', {msg: 'Email ou senha incorretos', success: false})
    } finally {
      dispatch('setLoading', false)
    }
  },

  async registerUser({commit, dispatch}, user) {
    try {
			dispatch('setLoading', true)
			await http.post('auth/register', user)
      // const { data } = await http.post('auth/register', user)
      // commit('DEFINE_REGISTER', {
      //   token: data.access_token,
      //   user: data.user
      // })
      dispatch('setSnackBar', {msg: 'Usuário Cadastrado com Sucesso!'})
    }catch(err) {
      console.log(err)
      dispatch('setSnackBar', {msg: 'Falha ao cadastrar o usuário', success: false})
    } finally {
      dispatch('setLoading', false)
    }
  },

  async updateUser({commit , dispatch}, user) {
    try {
      dispatch('setLoading', true)
      const { data } = await http.put('auth/register', user)
      commit('DEFINE_REGISTER', {
        user: data.user
      })
      dispatch('setSnackBar', {msg: 'Dados atualizados com sucesso!'})
    }catch(err){
      console.log(err)
      dispatch('setSnackBar', {msg: 'Falha ao atualizar os dados do usuário', success: false})
    }finally {
      dispatch('setLoading', false)
    }
	},
	
// 	async listHeights({commit, dispatch}, height) {
// 		try {
// 			const { data } = await http.get('peso')
// 			console.log(data)
// 			// commit('GET_HEIGHT', {
// 			// 	height: data
// 			// })
// 			console.log(data)
// 		}catch(err) {
// 			console.log(err)
// 		}
// 	}
}

const getters = {
	user: (state) => {
    return state.user
  }
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

