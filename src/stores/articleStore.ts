import { IArticle, IArticles, IHttpArticle } from '@admin/interfaces/IArticle'
import { httpGet } from '@admin/utils/plugins'
import { defineStore } from 'pinia'
import { computed } from 'vue'

interface IState {
  articleList: IArticle[]
  articleData: IArticle
}

export const useArticleStore = defineStore('artilce', {
  state: (): IState => ({
    articleList: [],
    articleData: {},
  }),

  getters: {
    articleCount: (state) => state.articleList.length,
  },

  actions: {
    // get all article
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
  },
})
