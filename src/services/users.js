import { HTTPClient } from '../utils/request'

export default {
  create: async payload => await HTTPClient.post('/users', payload),
  update: async payload => {
    const { data } = await HTTPClient.put('/users', payload)
    return data
  },
  get: async payload => {
    const { data } = await HTTPClient.get('/users', {
      params: { userId: payload.userId }
    })
    return data
  }
}
