import { createRouter, createWebHistory } from 'vue-router'
import BancoCha from '../views/BancoCha.vue'
import Home from '../views/Home.vue'
import Chat from '../components/Chat.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'home',
      component: Home
    },
    
    {
      path: '/BancoCha',
      name: 'bancocha',
      component: BancoCha
    },
    {
      path: '/Chat',
      name: 'chat',
      component: Chat
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
      path: '/resultados',
      name: 'resultados',
      component: () => import('../views/Resultados.vue')
    },

    {
      path: '/busca',
      name: 'busca',
      component: () => import('../views/BuscaResults.vue')
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
