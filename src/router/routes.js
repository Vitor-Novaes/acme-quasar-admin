const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Dashboard.vue')},
      {
        path: 'orders', component: () => import('pages/orders'),
        children: [
          {
            path: '',
            name: 'orders-list',
            component: () => import('pages/orders/list'),
          },
        ]
      },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },
]

export default routes
