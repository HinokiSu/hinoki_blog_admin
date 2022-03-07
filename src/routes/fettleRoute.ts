import { RouteRecordRaw } from 'vue-router'

export const FettlrRoutes: RouteRecordRaw[] = [
  {
    path: 'fettle',
    name: 'fettle',
    component: () => import('@admin/views/fettle/index.vue'),
  },
]
