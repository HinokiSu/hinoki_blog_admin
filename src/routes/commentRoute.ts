import { RouteRecordRaw } from 'vue-router'

export const CommentRoutes: RouteRecordRaw[] = [
  {
    path: 'comments',
    name: 'comments',
    component: () => import('@admin/views/comment/comments.vue'),
  },
]
