import { IVisitor, IVisitors } from '@admin/interfaces'
import { httpDelete, httpGet } from '@admin/utils/axios'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface IState {
  visitorList: IVisitor[]
}

export const useVisitorStore = defineStore('visitor', {
  state: (): IState => ({
    visitorList: [],
  }),

  getters: {},

  actions: {
    // 获取所有访问者
    async getVisitorList() {
      try {
        const result = <IVisitors>await httpGet({ url: '/visitor/all' })
        this.visitorList = result.visitors.map((item) => {
          return {
            _id: item._id,
            nickname: item.nickname,
            email: item.email,
            createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm'),
          }
        })
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    // 根据Id删除访问者
    async deleteVisitor(id: string) {
      try {
        const result = <any>await httpDelete({ url: `/visitor/${id}` })
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },
    // recycle data
    recycleVisitor() {
      this.visitorList = []
    },
  },
})
