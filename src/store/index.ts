import { createStore } from "vuex"
import uiModule from "./ui"
import type { UIState } from "./ui"
import custModule from "./cust"
import type { CustState } from "./cust"
import modalModule from "./modal"
import type { ModalState } from "./modal"
import transModule from "./trans"
import type { TransState } from "./trans"
import { authPlugin } from "./plugins/authPlugin"
import { tokenStorage } from "@/infrastructure/storage"
import { jwtDecode } from "jwt-decode"

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
  } catch (e) {
    console.warn("Invalid token found in local storage", e)
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
  store.commit("cust/setUsername", initialUsername)
  store.dispatch("trans/fetchTransactionsByFilter")
}
