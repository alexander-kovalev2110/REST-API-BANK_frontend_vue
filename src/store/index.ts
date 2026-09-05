import type { CustState } from './cust'
import type { ModalState } from './modal'
import type { TransState } from './trans'
import type { UIState } from './ui'
import { jwtDecode } from 'jwt-decode'
import { createStore } from 'vuex'
import { tokenStorage } from '@/infrastructure/storage'
import custModule from './cust'
import modalModule from './modal'
import { authPlugin } from './plugins/authPlugin'
import transModule from './trans'
import uiModule from './ui'

export interface RootState {
  ui: UIState
  cust: CustState
  modal: ModalState
  trans: TransState
}

// Restore session from token on startup
const token = tokenStorage.get()
let initialUsername: string | null = null
if (token) {
  try {
    const decoded = jwtDecode<{ username: string }>(token)
    initialUsername = decoded.username
  } catch (error) {
    console.warn('Invalid token found in local storage', error)
  }
}

export const store = createStore<RootState>({
  modules: {
    ui: uiModule,
    cust: custModule,
    modal: modalModule,
    trans: transModule,
  },
  plugins: [authPlugin],
})

if (initialUsername) {
  store.commit('cust/setUsername', initialUsername)
  store.dispatch('trans/fetchTransactionsByFilter')
}
