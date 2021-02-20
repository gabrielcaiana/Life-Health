import http from '../../../http'

export const namespaced = true;

export const state = {
	user: JSON.parse(localStorage.getItem('user')),
	token: localStorage.getItem('token') || '',
}

export const mutations = {
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
}

export const actions = {
	async efetuarLogin({ commit, dispatch }, user) {
    try {
      dispatch('loading/setLoading', true, {root: true})
      const { data } = await http.post('auth/login', user)
      commit("DEFINE_USER_LOGIN",{
        token: data.access_token,
        user: data.user
      })
      dispatch('snackbar/setSnackBar', {msg: 'Login Efetuado com sucesso!'}, {root: true})
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.access_token)
    } catch(err) {
      dispatch('snackbar/setSnackBar', {msg: 'Email ou senha incorretos', success: false}, {root: true})
    } finally {
      dispatch('loading/setLoading', false, {root: true})
    }
  },

	efetuarLogout({ commit, dispatch }) {
		try{
			dispatch('loading/setLoading', true, {root: true})
			commit('DEFINE_LOGOUT')
			dispatch('snackbar/setSnackBar', {msg: 'Logout realizado com sucesso!'}, {root: true})
		}catch {
			dispatch('snackbar/setSnackBar', {msg: 'Falha ao realizar o logout!'}, {root: true})
		} finally {
			dispatch('loading/setLoading', false, {root: true})
		}
	},

  async registerUser({commit, dispatch}, user) {
    try {
			dispatch('loading/setLoading', true, {root: true})
			await http.post('auth/register', user)
      dispatch('snackbar/setSnackBar', {msg: 'Usuário Cadastrado com Sucesso!'})
    }catch(err) {
      console.log(err)
      dispatch('snackbar/setSnackBar', {msg: 'Falha ao cadastrar o usuário', success: false}, {root: true})
    } finally {
      dispatch('loading/setLoading', false, {root: true})
    }
  },

  async updateUser({commit , dispatch}, user) {
    try {
      dispatch('loading/setLoading', true, {root: true})
      const { data } = await http.put('auth/register', user)
      commit('DEFINE_REGISTER', {
        user: data.user
      })
      dispatch('snackbar/setSnackBar', {msg: 'Dados atualizados com sucesso!'}, {root: true})
    }catch(err){
      console.log(err)
      dispatch('snackbar/setSnackBar', {msg: 'Falha ao atualizar os dados do usuário', success: false}, {root: true})
    }finally {
      dispatch('loading/setLoading', false, {root: true})
    }
	},
}

export const getters = {
	user: (state) => {
    return state.user
  }
}