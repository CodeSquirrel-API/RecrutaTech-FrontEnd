import { createRouter, createWebHistory } from 'vue-router'
import BancoCha from '../views/BancoCha.vue'
import Home from '../views/Home.vue'
import Chat from '../components/Chat.vue'
import Configuracoes from '../views/Configuracoes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Login',
    },
    {
      path: '/Home',
      name: 'home',
      component: Home
    },
    {
      path: '/configuracoes',
      name: 'configuracoes',
      component: Configuracoes
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
    // {
    //   path: '/resultados',
    //   name: 'resultados',
    //   component: () => import('../views/Resultados.vue')
    // },
    {
      path: '/configuracoes',
      name: 'configuracoes',
      component: () => import('../views/Configuracoes.vue')
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
    },
    {
      path: '/resetPassword',
      name: 'resetpassword',
      component: () => import('../views/RecuperarSenha.vue')
    },
    {
      path: '/NewPassword',
      name: 'newpassword',
      component: () => import('../views/NovaSenha.vue')
    }
  ]
})

// AQUI EU ESTOU DANDO PERMISSÃO PARA ACESSAR AS OUTRAS ROTAS DA APLICAÇÃO SE O USUÁRIO ESTIVER LOGADO. CASO A ROTA QUE ELE QUER ACESSAR SEJA DIFERENTES DAS QUE ESTÃO ABAIXO
// ELE VAI PRECISAR FAZER O LOGIN.
router.beforeEach((to, from) => {
  console.log(localStorage.getItem('token'));
    
  if(to.name !== 'login' && to.name!='cadastroCPF' && 
  to.name!='cadastroCNPJ' && 
  to.name!='resetpassword' && 
  !localStorage.getItem('token')) {
    return false;
  }
  return true;
})

export default router
