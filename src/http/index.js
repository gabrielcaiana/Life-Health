import axios from 'axios'
import { state } from '../store/modules/user/index'

const http = axios.create({
  baseURL: 'https://life-health-api.herokuapp.com/',
  headers: {
		"Accept": "application/json",
		"Content": "application/json"
  }
})

http.interceptors.request.use(
  config => {
    const token = state.token
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
