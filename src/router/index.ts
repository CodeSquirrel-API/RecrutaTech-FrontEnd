import { createRouter, createWebHistory } from 'vue-router'
import BancoCha from '../views/BancoCha.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/BancoCha',
      name: 'home',
      component: BancoCha
    },
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/TheLogin.vue')
    },
    {
      path: '/cadastroCPF',
      name: 'cadastroCPF',
      component: () => import('../views/CadastroCPF.vue')
    },
    {
      path: '/cadastroCNPJ',
      name: 'cadastroCNPJ',
      component: () => import('../views/CadastroCNPJ.vue')
    }
  ]
})

export default router
