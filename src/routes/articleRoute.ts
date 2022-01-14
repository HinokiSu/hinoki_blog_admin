import { RouteRecordRaw } from 'vue-router'

export const ArticleRoutes: RouteRecordRaw[] = [
  {
    // 显示所有
    path: 'article',
    name: 'article',
    component: () => import('@admin/views/article/index.vue'),
  },
  {
    // 预览指定文章
    name: 'article-preview',
    path: '/article/preview/:title',
    component: () => import('@admin/layouts/pre-article-layout.vue'),
  },
]
