import { RouteRecordRaw } from 'vue-router'

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: 'users',
    component: () => import('@admin/views/user/index.vue'),
  },
]
