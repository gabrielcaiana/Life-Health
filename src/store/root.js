import * as apiMethods from '../services'
import { parseNetworkError } from '../utils/request'

export const SET_API_CALL_IN_PROGRESS = 'SET_API_CALL_IN_PROGRESS'
export const SET_GENERAL_ERRORS = 'SET_GENERAL_ERRORS'

export default {
  state: {
    isAPICallInProgress: false,
    generalErrors: []
  },
  mutations: {
    [SET_API_CALL_IN_PROGRESS]: (state, status) => {
      state.isAPICallInProgress = status
    },
    [SET_GENERAL_ERRORS]: (state, error) => {
      state.generalErrors.push(error)
    }
  },
  actions: {
    async apiMethods({ commit }, { entity, action, payload = {}, query, params }) {
      try {
        const response = await apiMethods[entity][action]({ payload, query, params })
        return response
      } catch (error) {
        const errorPayload = { [`${entity}_${action}_request`]: parseNetworkError(error) }
        commit(SET_GENERAL_ERRORS, errorPayload)
      }
    }
  }
}
