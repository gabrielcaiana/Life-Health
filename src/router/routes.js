import Home from '../views/public/Login.vue'
import Register from "../views/public/Register.vue"
import Index from "../views/private/Index.vue"

import Dashboard from "../views/private/pages/Dashboard.vue"
import Peso from "../views/private/pages/Peso.vue"
import Alimentos from "../views/private/pages/Alimentos.vue"
import Pressao_arterial from "../views/private/pages/Pressao_arterial.vue"
import Atividades_fisicas from "../views/private/pages/Atividades_fisicas.vue"
import Perfil from "../views/private/pages/Perfil.vue"


export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/index', component: Index,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/peso',
        name: 'peso',
        component: Peso
      },
      {
        path: '/alimentos',
        name: 'alimentos',
        component: Alimentos
      },
      {
        path: '/pressao-arterial',
        name: 'pressao-arterial',
        component: Pressao_arterial
      },
      {
        path: '/atividades-fisicas',
        name: 'atividades-fisicas',
        component: Atividades_fisicas
      },
      {
        path: '/perfil',
        name: 'perfil',
        component: Perfil
      }
    ]
  }
]
