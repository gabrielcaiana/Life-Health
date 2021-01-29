export default [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/public/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/public/Register.vue')
  },
  {
		path: '/index', 
		name: 'index',
		component: () => import('../views/private/Index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/private/pages/Dashboard.vue')
      },
      {
        path: '/peso',
        name: 'peso',
        component: () => import('../views/private/pages/Peso.vue')
      },
      {
        path: '/alimentos',
        name: 'alimentos',
        component: () => import('../views/private/pages/Alimentos.vue')
      },
      {
        path: '/pressao-arterial',
        name: 'pressao-arterial',
        component: () => import('../views/private/pages/Pressao_arterial.vue')
      },
      {
        path: '/atividades-fisicas',
        name: 'atividades-fisicas',
        component: () => import('../views/private/pages/Atividades_fisicas.vue')
      },
      {
        path: '/perfil',
        name: 'perfil',
        component: () => import('../views/private/pages/Perfil.vue')
      }
    ]
  }
]
