import { IComment, ICommentList } from '@admin/interfaces/IComment'
import { httpDelete, httpGet } from '@admin/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  commentList: IComment[]
}

export const useCommentStore = defineStore('comment', {
  state: (): IState => ({
    commentList: [],
  }),

  getters: {},

  actions: {
    async getCommentList() {
      try {
        const result = <ICommentList>await httpGet({ url: '/comment/all' })
        this.commentList = result.comments
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    async deleteVisitor(id: string) {
      try {
        const result = <any>await httpDelete({ url: `/comment/${id}` })
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },
    // recycle data
    recycleVisitor() {
      this.commentList = []
    },
  },
})
