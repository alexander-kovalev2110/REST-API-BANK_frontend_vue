import type { Module } from "vuex"
import type { RootState } from "./index"

export interface UIState {
  loading: boolean
  error: string | null
}

const uiModule: Module<UIState, RootState> = {
  namespaced: true,
  state: () => ({
    loading: false,
    error: null,
  }),
  mutations: {
    setLoading(state: UIState, payload: boolean) {
      state.loading = payload
    },
    setError(state: UIState, payload: string | null) {
      state.error = payload
    },
    clearError(state: UIState) {
      state.error = null
    },
  },
}

export default uiModule
