import type { Module, ActionContext } from "vuex"
import type { RootState } from "./index"
import { custApi } from "@/infrastructure/api/cust/cust.api"
import type { CustRequest } from "@/infrastructure/api/cust/cust.types"
import { handleApiError } from "@/infrastructure/api/error/handleApiError"
import { validateRegister } from "@/domain/cust"

export interface CustState {
  username: string | null
}

const custModule: Module<CustState, RootState> = {
  namespaced: true,
  state: () => ({
    username: null,
  }),
  mutations: {
    setUsername(state: CustState, username: string | null) {
      state.username = username
    },
    resetCust(state: CustState) {
      state.username = null
    },
    loginSuccess(state: CustState, token: string) {
      // Handled by plugin
    },
    registerSuccess(state: CustState, token: string) {
      // Handled by plugin
    },
  },
  actions: {
    async login({ commit }: ActionContext<CustState, RootState>, payload: CustRequest) {
      try {
        commit("ui/setLoading", true, { root: true })
        commit("ui/setError", null, { root: true })
        
        const response = await custApi.login(payload)
        
        commit("loginSuccess", response.token)
      } catch (err) {
        const errMsg = handleApiError(err, "Login failed")
        commit("ui/setError", errMsg, { root: true })
        throw err
      } finally {
        commit("ui/setLoading", false, { root: true })
      }
    },

    async register({ commit }: ActionContext<CustState, RootState>, payload: CustRequest) {
      try {
        commit("ui/setLoading", true, { root: true })
        commit("ui/setError", null, { root: true })

        // Validate domain rules before API call
        const domainError = validateRegister(payload)
        if (domainError) {
          commit("ui/setError", domainError, { root: true })
          throw new Error(domainError)
        }

        const response = await custApi.register(payload)
        
        commit("registerSuccess", response.token)
      } catch (err: any) {
        const errMsg = handleApiError(err, err.message || "Register failed")
        commit("ui/setError", errMsg, { root: true })
        throw err
      } finally {
        commit("ui/setLoading", false, { root: true })
      }
    },

    logout({ commit }: ActionContext<CustState, RootState>) {
      commit("resetCust")
    },
  },
}

export default custModule
