import { IArticle, IArticles, IHttpArticle } from '@admin/interfaces/IArticle'
import { nowDateFormat } from '@admin/utils/format'
import { httpDelete, httpGet, httpPost, httpPut } from '@admin/utils/plugins'
import { defineStore } from 'pinia'

interface IState {
  articleList: IArticle[]
  articleData: IArticle
  fettle: boolean
}

export const useArticleStore = defineStore('artilce', {
  state: (): IState => ({
    articleList: [],
    articleData: {
      classification: [],
    },
    // whether request is success
    fettle: false,
  }),

  getters: {
    articleCount: (state) => state.articleList.length,
  },

  actions: {
    // get all article
    // TODO: determine whether request is success according to response status
    async getArticleList() {
      try {
        const result = <IArticles>await httpGet({ url: '/admin/article/all' })

        this.articleList = result.articles
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    async getArticleById(articleId: string) {
      try {
        const result = <IHttpArticle>await httpGet({
          url: `/admin/article/${articleId}`,
        })
        this.articleData = result.article[0]
      } catch (error) {
        throw error
      }
    },

    async createArticle() {
      try {
        console.log('this', this.articleData)
        const result = await httpPost({
          url: '/admin/article/new',
          data: this.articleData,
        })
        this.fettle = true
      } catch (error) {
        this.fettle = false
        throw error
      }
    },

    async updateArticle(articleId: string) {
      try {
        const updatedArticle = { ...this.articleData }
        updatedArticle.updatedAt = nowDateFormat('YYYY-MM-DD hh:mm:ss')
        const result = <IHttpArticle>await httpPut({
          url: `/admin/article/${articleId}`,
          data: updatedArticle,
        })
        this.fettle = true
      } catch (error) {
        this.fettle = false
        throw error
      }
    },

    async deleteArticle(articleId: string) {
      try {
        const result = <IHttpArticle>await httpDelete({
          url: `/admin/article/${articleId}`,
        })
        this.fettle = true
      } catch (error) {
        this.fettle = false
        throw error
      }
    },
  },
})
