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
          {
            path: 'details/:id',
            name: 'order-details',
            props: true,
            component: () => import('pages/orders/details'),
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
          {
            path: 'details/:id',
            name: 'product-details',
            component: () => import('pages/products/details'),
            props: true,
          },
          {
            path: 'themes',
            name: 'themes',
            component: () => import('pages/products/themes_list'),
            props: true,
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
