import type { RootState } from './index'
import type { Transaction, TransactionFilter } from '@/domain/trans'
import type { ActionContext, Module } from 'vuex'
import { validateAmount } from '@/domain/trans'
import { handleApiError } from '@/infrastructure/api/error/handleApiError'
import { transApi } from '@/infrastructure/api/trans/trans.api'

export interface TransState {
  transactions: any[]
  total: number
  page: number // 0-based
  pageSize: number
  filter: TransactionFilter
}

const PAGE_SIZE = 5

function initialTransState (): TransState {
  return {
    transactions: [],
    total: 0,
    page: 0,
    pageSize: PAGE_SIZE,
    filter: {
      amount: undefined,
      date: undefined,
    },
  }
}

const transModule: Module<TransState, RootState> = {
  namespaced: true,
  state: initialTransState,
  getters: {
    paginatedTransactions (state: TransState) {
      return state.transactions
    },
    paginationState (state: TransState) {
      return {
        previousDisabled: state.page === 0,
        nextDisabled: (state.page + 1) * state.pageSize >= state.total,
        page: state.page,
      }
    },
  },
  mutations: {
    resetTrans (state: TransState) {
      Object.assign(state, initialTransState())
    },
    setFilter (state: TransState, filter: TransactionFilter) {
      state.filter = filter
      state.page = 0
    },
    nextPage (state: TransState) {
      state.page++
    },
    previousPage (state: TransState) {
      state.page--
    },
    setTransactions (state: TransState, payload: { transactions: any[], total: number }) {
      state.transactions = payload.transactions
      state.total = payload.total ?? state.total
    },
    createSuccess (state: TransState) {},
    updateSuccess (state: TransState) {},
    deleteSuccess (state: TransState) {},
  },
  actions: {
    async createTransaction (
      { commit }: ActionContext<TransState, RootState>,
      { amount }: { amount: number },
    ) {
      try {
        commit('ui/setLoading', true, { root: true })
        commit('ui/setError', null, { root: true })

        const domainError = validateAmount(amount)
        if (domainError) {
          commit('ui/setError', domainError, { root: true })
          throw new Error(domainError)
        }

        await transApi.create(amount)
        commit('createSuccess')
      } catch (error: any) {
        const errMsg = handleApiError(error, error.message || 'Transaction creation failed')
        commit('ui/setError', errMsg, { root: true })
        throw error
      } finally {
        commit('ui/setLoading', false, { root: true })
      }
    },

    async fetchTransactionById (
      { commit }: ActionContext<TransState, RootState>,
      { id }: { id: string },
    ) {
      try {
        commit('ui/setLoading', true, { root: true })
        commit('ui/setError', null, { root: true })

        const data = await transApi.getById(id)
        commit('setTransactions', data)
      } catch (error) {
        const errMsg = handleApiError(error, 'Failed to fetch transaction')
        commit('ui/setError', errMsg, { root: true })
        throw error
      } finally {
        commit('ui/setLoading', false, { root: true })
      }
    },

    async fetchTransactionsByFilter ({ commit, state }: ActionContext<TransState, RootState>) {
      try {
        commit('ui/setLoading', true, { root: true })
        commit('ui/setError', null, { root: true })

        const data = await transApi.getByFilter({
          ...state.filter,
          page: state.page + 1, // API uses 1-based page
          limit: state.pageSize,
        })
        commit('setTransactions', data)
      } catch (error) {
        const errMsg = handleApiError(error, 'Failed to fetch transactions')
        commit('ui/setError', errMsg, { root: true })
        throw error
      } finally {
        commit('ui/setLoading', false, { root: true })
      }
    },

    async updateTransaction (
      { commit }: ActionContext<TransState, RootState>,
      { id, amount }: { id: string, amount: number },
    ) {
      try {
        commit('ui/setLoading', true, { root: true })
        commit('ui/setError', null, { root: true })

        const domainError = validateAmount(amount)
        if (domainError) {
          commit('ui/setError', domainError, { root: true })
          throw new Error(domainError)
        }

        await transApi.update(id, amount)
        commit('updateSuccess')
      } catch (error: any) {
        const errMsg = handleApiError(error, error.message || 'Transaction update failed')
        commit('ui/setError', errMsg, { root: true })
        throw error
      } finally {
        commit('ui/setLoading', false, { root: true })
      }
    },

    async deleteTransaction (
      { commit }: ActionContext<TransState, RootState>,
      { id }: { id: string },
    ) {
      try {
        commit('ui/setLoading', true, { root: true })
        commit('ui/setError', null, { root: true })

        await transApi.remove(id)
        commit('deleteSuccess')
      } catch (error) {
        const errMsg = handleApiError(error, 'Transaction delete failed')
        commit('ui/setError', errMsg, { root: true })
        throw error
      } finally {
        commit('ui/setLoading', false, { root: true })
      }
    },
  },
}

export default transModule
