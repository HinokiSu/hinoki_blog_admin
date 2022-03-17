import { IFettle, IHttpFettle, IHttpTopArticle, TopArticle } from '@admin/interfaces'
import { httpGet } from '@admin/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  fettleList: IFettle[]
  pageviewsList: any
  topArticleList: TopArticle[]
}

export const useFettleStore = defineStore('fettle', {
  state: (): IState => ({
    fettleList: [],
    pageviewsList: [],
    topArticleList: [],
  }),

  getters: {},
  actions: {
    async getArticleCountInCategory() {
      const res = <IHttpFettle>await httpGet({ url: '/state/category' })
      this.fettleList = res.fettle
    },

    async getTopArticles() {
      const res = <IHttpTopArticle>await httpGet({ url: '/state/article/top' })
      this.topArticleList = res.fettle
    },

    async getPageviewsByCategory() {
      const res = <IHttpFettle>await httpGet({ url: '/state/pageviews/category' })
      const { fettle } = res
      // {name: , value: } -> [ , ]
      const temp = []
      for (let t of fettle) {
        temp.push([t.name, t.value])
      }
      this.pageviewsList = temp
    },
  },
})
