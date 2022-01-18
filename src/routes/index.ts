import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ArticleRoutes } from './articleRoute'
import { CategoryRoutes } from './categoryRoute'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@admin/layouts/home-layout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@admin/views/home.vue'),
      },
      {
        path: 'manage',
        component: () => import('@admin/layouts/content-layout.vue'),
        children: [...ArticleRoutes, ...CategoryRoutes],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@admin/views/login.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
