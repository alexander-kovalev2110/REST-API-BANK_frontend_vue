/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import type { App } from 'vue'
import vuetify from './vuetify'
import router from '../router'
import { store } from '../store'

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(router)
  app.use(store)
}