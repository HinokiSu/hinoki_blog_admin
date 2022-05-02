import { RouteRecordRaw } from 'vue-router'

export const VisitorRoutes: RouteRecordRaw[] = [
  {
    path: 'visitors',
    name: 'visitors',
    component: () => import('@admin/views/visitor/visitors.vue'),
  },
]
