export default [
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
      {
        path: 'products', component: () => import('pages/products'),
        children: [
          {
            path: '',
            name: 'products-list',
            component: () => import('pages/products/list'),
          },
        ]
      },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },
];
