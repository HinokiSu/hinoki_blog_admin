import { IArticle, IHttpArticle, IPagination } from '@admin/interfaces/IArticle'
import { nowDateFormat } from '@admin/utils/format'
import { httpDelete, httpGet, httpPost, httpPut } from '@admin/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  articleList: IArticle[]
  articleData: IArticle
  articleTotal: number
  fettle: boolean
}

export const useArticleStore = defineStore('artilce', {
  state: (): IState => ({
    articleList: [],
    articleData: {},
    articleTotal: 1,
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
        const result = <IHttpArticle>await httpGet({ url: '/article/all' })

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
        this.articleData = result.articles[0]
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
        this.fettle = false
        throw error
      }
    },

    async updateArticle(articleId: string) {
      try {
        const updatedArticle = { ...this.articleData }
        updatedArticle.updatedAt = nowDateFormat('YYYY-MM-DD hh:mm:ss')
        const result = <IHttpArticle>await httpPut({
          url: `/article/${articleId}`,
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
          url: `/article/${articleId}`,
        })
        this.fettle = true
      } catch (error) {
        this.fettle = false
        throw error
      }
    },

    async getArticlePagination(curPage: number, pageSize: number) {
      try {
        const result = <IPagination>await httpGet({
          url: `/article/pagination/${curPage}/${pageSize}`,
        })
        this.articleTotal = result.total
        this.articleList = result.articles
        this.fettle = true
      } catch (error) {
        this.fettle = false
        throw error
      }
    },

    // 回收数据
    recycleArticleData() {
      this.articleData = {}
    },
  },
})
