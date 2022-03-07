import { httpGet } from '@admin/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  fettleList: IFettle[]
}

export const useFettleStore = defineStore('fettle', {
  state: (): IState => ({
    fettleList: [],
  }),

  getters: {},
  actions: {
    async getArticleCountInCategory() {
      const res = <IHttpFettle>await httpGet({ url: '/state/category' })
      this.fettleList = res.fettle
    },
  },
})
