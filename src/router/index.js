import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import http from '@/http'

Vue.use(Router)

Vue.prototype.$http = http

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	if(!to.meta.public && !store.state.token) {
		return next({path: '/'})
	}else {
		next()
	}
})
export default router
