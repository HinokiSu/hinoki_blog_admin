import { RouteRecordRaw } from 'vue-router'

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: 'users',
    component: () => import('@admin/views/user/users.vue'),
  },
  {
    path: 'user/create',
    name: 'create-user',
    component: () => import('@admin/views/user/create-user.vue'),
  },
]
