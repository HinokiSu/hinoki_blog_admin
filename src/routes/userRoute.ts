import { RouteRecordRaw } from 'vue-router'

export const UserRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: 'users',
    component: () => import('@admin/views/user/index.vue'),
  },
 /*  {
    path: 'user/user',
    name: 'create-user',
    component: () => import('@admin/views/category/create-category.vue'),
  }, */
]
