import axios from 'axios'
import store from '@/store'

const http = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
		"Accept": "application/json",
		"Content": "application/json"
  }
})

http.interceptors.request.use(
  config => {
    const token = store.state.token
    if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default http
