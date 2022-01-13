import { IArticle, IArticles } from '@admin/interfaces/IArticle'
import { httpGet } from '@admin/utils/plugins'
import { defineStore } from 'pinia'

interface IState {
  articleList: IArticle[]
}

export const useArticleStore = defineStore('artilce', {
  state: (): IState => ({
    articleList: [],
  }),

  getters: {
    articleCount: state => state.articleList.length
  },

  actions: {
    // logic
    async getArticle() {
      try {
        const result = <IArticles>await httpGet({ url: '/article/' })

        this.articleList = result.articles
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },
  },
})
