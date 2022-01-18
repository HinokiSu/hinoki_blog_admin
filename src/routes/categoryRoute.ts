import { RouteRecordRaw } from 'vue-router'

export const CategoryRoutes: RouteRecordRaw[] = [
  {
    path: 'categories',
    name: 'categories',
    component: () => import('@admin/views/category/index.vue'),
  },
]
