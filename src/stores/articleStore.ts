import { IArticle, IArticles, IHttpArticle } from '@admin/interfaces/IArticle'
import { httpGet } from '@admin/utils/plugins'
import { defineStore } from 'pinia'
import { computed } from 'vue'

interface IState {
  articleList: IArticle[]
  article: IArticle
}

export const useArticleStore = defineStore('artilce', {
  state: (): IState => ({
    articleList: [],
    article: {},
  }),

  getters: {
    articleCount: (state) => state.articleList.length,
    getArticle: (state) => computed(() => state.article),
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
      console.log(articleId)
      try {
        const result = <IHttpArticle>await httpGet({
          url: `/article/${articleId}`,
        })
        this.article = result.article
      } catch (error) {
        console.log('error: ', error)
        throw error
      }
    },
  },
})
