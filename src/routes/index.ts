import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ArticleRoutes } from './articleRoute'
import { CategoryRoutes } from './categoryRoute'
import { useUserStore } from '@admin/stores/userStore'
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

// 身份认证
router.beforeEach((to, from, next) => {
  const store = useUserStore()

  if (to.path === '/login') return next()
  const tokenstr = localStorage.getItem('access_token')
  // 存储中无token，则返回到登录界面
  if (!tokenstr)
    return next({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    })
  next()
})

export default router
