import { ILoginUser, IUser } from '@admin/interfaces'
import { httpGet, httpPost, httpPut } from '@admin/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  user: IUser
  errorInfo: string
  authStatus: boolean
}

export const useUserStore = defineStore('user', {
  state: (): IState => ({
    user: {
      user_id: '',
      username: '',
      access_token: '',
    },
    authStatus: false,
    errorInfo: '',
  }),

  getters: {
    getToken: (state) => {
      return localStorage.getItem('access_token')
    },
  },

  actions: {
    // 清空token
    async loginAuth(username: string, password: string) {
      console.log(username)
      // 返回 access_token, user_id, username
      const res = <IUser>await httpPost({
        url: '/auth/login',
        data: {
          username,
          password,
        },
      })

      if (!res.access_token) {
        this.errorInfo = 'token返回为空'
        return false
      } else {
        // 存储到本地存储中access_token
        localStorage.setItem('access_token', res.access_token)
        // 存储到 状态管理器中
        this.user.access_token = res.access_token
        return true
      }
    },
  },
})
