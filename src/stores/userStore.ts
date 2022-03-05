import { ILoginUser, IUser } from '@admin/interfaces'
import { httpGet, httpPost, httpPut } from '@admin/utils/axios'
import { access } from 'fs/promises'
import { defineStore } from 'pinia'

interface IState {
  user: IUser
  errorInfo: string
}

export const useUserStore = defineStore('user', {
  state: (): IState => ({
    user: {
      user_id: '',
      username: '',
      access_token: '',
    },
    errorInfo: '',
  }),

  getters: {
    // 防止刷新后，user状态管理初始化
    getToken: (state) => {
      return (state.user.access_token = localStorage.getItem('access_token')
        ? (localStorage.getItem('access_token') as string)
        : '')
    },
    getUsername: (state) => {
      return (state.user.username = localStorage.getItem('username')
        ? (localStorage.getItem('username') as string)
        : '')
    },
    getUId: (state) => {
      return (state.user.user_id = localStorage.getItem('uid') ? (localStorage.getItem('uid') as string) : '')
    },
    // 判断errorInfo是否为空
    getErrorInfo: (state) => (state.errorInfo !== '' ? true : false),
  },

  actions: {
    // 清空token
    async loginAuth(username: string, password: string) {
      // 返回 access_token, user_id, username
      const res = <IUser>await httpPost({
        url: '/auth/login',
        data: {
          username,
          password,
        },
      })

      // 存储到本地存储中access_token
      localStorage.setItem('access_token', res.access_token)
      localStorage.setItem('username', res.username)
      localStorage.setItem('uid', res.user_id)
      //
      this.user.access_token = res.access_token
      this.user.user_id = res.user_id
      this.user.username = res.username
      return true
    },

    logout() {
      // 清除localStorage中的数据
      localStorage.removeItem('access_token')
      localStorage.removeItem('username')
      localStorage.removeItem('uid')
      // 清除状态中的数据
      this.recycleData()
    },

    // 清空状态中的数据
    recycleData() {
      this.user = {
        user_id: '',
        username: '',
        access_token: '',
      }
      this.cleanErrorInfo()
    },

    // 清除错误提示信息
    cleanErrorInfo() {
      this.errorInfo = ''
    },
  },
})
