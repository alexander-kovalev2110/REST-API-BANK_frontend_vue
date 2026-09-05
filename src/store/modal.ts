import type { RootState } from './index'
import type { TransAction } from '@/types/ui-actions'
import type { Module } from 'vuex'

export interface ModalState {
  authorOpen: boolean
  transOpen: boolean
  transAction: TransAction | null
}

const modalModule: Module<ModalState, RootState> = {
  namespaced: true,
  state: () => ({
    authorOpen: false,
    transOpen: false,
    transAction: null,
  }),
  mutations: {
    openAuthor (state: ModalState) {
      state.authorOpen = true
    },
    closeAuthor (state: ModalState) {
      state.authorOpen = false
    },
    openTrans (state: ModalState, action: TransAction) {
      state.transOpen = true
      state.transAction = action
    },
    closeTrans (state: ModalState) {
      state.transOpen = false
      state.transAction = null
    },
  },
}

export default modalModule
