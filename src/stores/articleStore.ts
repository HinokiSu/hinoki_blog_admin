import { IArticle, IHttpArticle, IPagination } from '@admin/interfaces/IArticle'
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

    // 创建文章
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

    // 文章更新
    async updateArticle(articleId: string) {
      try {
        const result = <IHttpArticle>await httpPut({
          url: `/article/${articleId}`,
          data: this.articleData,
        })
      } catch (error) {
        throw error
      }
    },

    // 删除文章
    async deleteArticle(articleId: string) {
      try {
        const result = <IHttpArticle>await httpDelete({
          url: `/article/${articleId}`,
        })
      } catch (error) {
        throw error
      }
    },

    // 分页查询,获取文章
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
