import { createRouter, createWebHistory } from 'vue-router'
import AuthorPage from '@/views/AuthorPage.vue'
import TransPage from '@/views/TransPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Author',
      component: AuthorPage,
    },
    {
      path: '/trans',
      name: 'Transactions',
      component: TransPage,
    },
  ],
})

export default router
