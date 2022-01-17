import { IArticle, IArticles, IHttpArticle } from '@admin/interfaces/IArticle'
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
    articleData: {},
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
        const result = <IArticles>await httpGet({ url: '/article/' })

        this.articleList = result.articles
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    async getArticleById(articleId: string) {
      try {
        const result = <IHttpArticle>await httpGet({
          url: `/article/${articleId}`,
        })
        this.articleData = result.article
      } catch (error) {
        throw error
      }
    },

    async createArticle() {
      try {
        console.log('this', this.articleData)
        const result = await httpPost({
          url: '/article/new',
          data: this.articleData,
        })
        this.fettle = true
      } catch (error) {
        throw error
      }
    },

    async updateArticle(articleId: string) {
      try {
        const result = <IHttpArticle>await httpPut({
          url: `/article/${articleId}`,
          data: this.articleData,
        })
        this.fettle = true
      } catch (error) {
        throw error
      }
    },

    async deleteArticle(articleId: string) {
      try {
        const result = <IHttpArticle>await httpDelete({
          url: `/article/${articleId}`,
        })
        this.fettle = true
      } catch (error) {
        throw error
      }
    },
  },
})
