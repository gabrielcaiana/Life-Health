import axios from 'axios'
import store from '@/store'

const http = axios.create({
	baseURL: 'http://localhost:5000/',
	'Accept': 'application/json',
	'Content': 'application/json'
})

http.interceptors.request.use(config => {
	const token = store.state.toke
	if(token) config.Authorization = `Bearer ${token}`

	return config
	
}, err => {
	return Promise.reject(err)
})

export default http