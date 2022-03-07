import { IArticle, IHttpArticle, IPagination } from '@admin/interfaces/IArticle'
import { nowDateFormat } from '@admin/utils/format'
import { httpDelete, httpGet, httpPost, httpPut } from '@admin/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  articleList: IArticle[]
  articleData: IArticle
  articleTotal: number
}

export const useArticleStore = defineStore('artilce', {
  state: (): IState => ({
    articleList: [],
    articleData: {},
    articleTotal: 1,
    // whether request is success
  }),

  getters: {
    getArticleCount: (state) => state.articleList.length,
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
        const result = await httpPost({
          url: '/article/new',
          data: this.articleData,
        })
      } catch (error) {
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
      } catch (error) {
        throw error
      }
    },

    async deleteArticle(articleId: string) {
      try {
        const result = <IHttpArticle>await httpDelete({
          url: `/article/${articleId}`,
        })
      } catch (error) {
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
      } catch (error) {
        throw error
      }
    },

    // 回收数据
    recycleArticleData() {
      this.articleData = {}
    },

    // 模糊搜索
    async getFuzzySearch(keyword: string) {
      try {
        const result = <IPagination>await httpGet({ url: `/article/search/${keyword}` })
        if (result.total > 0) {
          this.articleList = result.articles
          // this.articleTotal = result.total
          return true
        } else {
          return false
        }
      } catch (error) {
        throw error
      }
    },
  },
})
