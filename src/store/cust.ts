import type { RootState } from './index'
import type { CustRequest } from '@/infrastructure/api/cust/cust.types'
import type { ActionContext, Module } from 'vuex'
import { validateRegister } from '@/domain/cust'
import { custApi } from '@/infrastructure/api/cust/cust.api'
import { handleApiError } from '@/infrastructure/api/error/handleApiError'

export interface CustState {
  username: string | null
}

const custModule: Module<CustState, RootState> = {
  namespaced: true,
  state: () => ({
    username: null,
  }),
  mutations: {
    setUsername (state: CustState, username: string | null) {
      state.username = username
    },
    resetCust (state: CustState) {
      state.username = null
    },
    loginSuccess (state: CustState, token: string) {
      // Handled by plugin
    },
    registerSuccess (state: CustState, token: string) {
      // Handled by plugin
    },
  },
  actions: {
    async login ({ commit }: ActionContext<CustState, RootState>, payload: CustRequest) {
      try {
        commit('ui/setLoading', true, { root: true })
        commit('ui/setError', null, { root: true })

        const response = await custApi.login(payload)

        commit('loginSuccess', response.token)
      } catch (error) {
        const errMsg = handleApiError(error, 'Login failed')
        commit('ui/setError', errMsg, { root: true })
        throw error
      } finally {
        commit('ui/setLoading', false, { root: true })
      }
    },

    async register ({ commit }: ActionContext<CustState, RootState>, payload: CustRequest) {
      try {
        commit('ui/setLoading', true, { root: true })
        commit('ui/setError', null, { root: true })

        // Validate domain rules before API call
        const domainError = validateRegister(payload)
        if (domainError) {
          commit('ui/setError', domainError, { root: true })
          throw new Error(domainError)
        }

        const response = await custApi.register(payload)

        commit('registerSuccess', response.token)
      } catch (error: any) {
        const errMsg = handleApiError(error, error.message || 'Register failed')
        commit('ui/setError', errMsg, { root: true })
        throw error
      } finally {
        commit('ui/setLoading', false, { root: true })
      }
    },

    logout ({ commit }: ActionContext<CustState, RootState>) {
      commit('resetCust')
    },
  },
}

export default custModule
