import { RouteRecordRaw } from 'vue-router'

export const ArticleRoutes: RouteRecordRaw[] = [
  {
    // 显示所有
    path: 'articles',
    name: 'articles',
    component: () => import('@admin/views/article/index.vue'),
  },
  {
    path: 'article/create',
    name: 'create-article',
    component: () => import('@admin/views/article/create-article.vue'),
  },
  {
    path: 'article/update/:id',
    name: 'update-article',
    component: () => import('@admin/views/article/update-article.vue'),
  },
]
