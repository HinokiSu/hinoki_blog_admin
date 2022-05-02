import { RouteRecordRaw } from 'vue-router'

export const CategoryRoutes: RouteRecordRaw[] = [
  {
    path: 'categories',
    name: 'categories',
    component: () => import('@admin/views/category/categories.vue'),
  },
  {
    path: 'category/create',
    name: 'create-category',
    component: () => import('@admin/views/category/create-category.vue'),
  },
]
