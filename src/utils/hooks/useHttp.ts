import { httpGet } from '../plugins'

export const getArticles = () => httpGet({ url: '/article/articles' })
