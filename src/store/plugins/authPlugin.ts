import type { RootState } from '../index'
import type { MutationPayload, Store } from 'vuex'
import { jwtDecode } from 'jwt-decode'
import { tokenStorage } from '@/infrastructure/storage'

interface JwtPayload {
  username: string
}

export function authPlugin (store: Store<RootState>) {
  store.subscribe((mutation: MutationPayload, state: RootState) => {
    // 1. LOGIN / REGISTER SUCCESS
    if (mutation.type === 'cust/loginSuccess' || mutation.type === 'cust/registerSuccess') {
      const token = mutation.payload

      // Save token to localStorage
      tokenStorage.save(token)

      // Decode username and update state
      try {
        const decoded = jwtDecode<JwtPayload>(token)
        store.commit('cust/setUsername', decoded.username)
      } catch (error) {
        console.error('Failed to decode token', error)
      }

      // Reset dependent state
      store.commit('trans/resetTrans')
    }

    // 2. LOGOUT
    if (mutation.type === 'cust/resetCust') {
      tokenStorage.clear()
      store.commit('trans/resetTrans')
    }

    // 3. TRANSACTION SUCCESS
    if (
      mutation.type === 'trans/createSuccess'
      || mutation.type === 'trans/updateSuccess'
      || mutation.type === 'trans/deleteSuccess'
    ) {
      store.dispatch('trans/fetchTransactionsByFilter')
    }
  })
}
