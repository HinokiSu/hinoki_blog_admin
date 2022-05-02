import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ArticleRoutes } from './articleRoute'
import { CategoryRoutes } from './categoryRoute'
import { useUserStore } from '@admin/stores/userStore'
import { UserRoutes } from './userRoute'
import { FettlrRoutes } from './fettleRoute'
import { VisitorRoutes } from './visitorRoute'
import { CommentRoutes } from './commentRoute'
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
        children: [
          ...ArticleRoutes,
          ...CategoryRoutes,
          ...UserRoutes,
          ...FettlrRoutes,
          ...VisitorRoutes,
          ...CommentRoutes,
        ],
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
  history: createWebHistory('/admin/'),
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
