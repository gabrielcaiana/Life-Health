import Vue from 'vue'
import Vuex from 'vuex'

import * as user from './modules/user'
import * as loading from './modules/loading'
import * as snackbar from './modules/snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		loading,
		snackbar
	}
})

