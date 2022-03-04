import router from '@admin/routes'
import axios from 'axios'
import { useUserStore } from '@admin/stores/userStore'
axios.defaults.baseURL = '/api/admin'
axios.defaults.timeout = 10000
// Request header information is set for post request
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // userStore在beforeEach中就创建成功
    const token = useUserStore().user.access_token
    token && (config.headers!.Authorization = token)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    console.log('response error:', error)
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          useUserStore().errorInfo = '用户名或密码错误'
          router.replace({
            name: 'login',
          })
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空pinia中token对象
        // 跳转登录页面
        case 403:
          console.log({
            message: '登录过期,请重新登录',
          })
          // 清除token
          localStorage.removeItem('access_token')
          useUserStore().user.access_token
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.value.fullPath,
              },
            })
          }, 1000)
          break
        // 404请求不存在
        case 404:
          console.log({
            message: '网络请求不存在',
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          console.log({
            message: error.response.data.message,
          })
      }
      return Promise.reject(error.response)
    }
  }
)
// 封装 get post put delete请求
// 请求参数接口
interface IHttpParams {
  url: string
  data?: object
}

// Get request
export const httpGet = ({ url }: IHttpParams) =>
  new Promise((resolve, reject) => {
    axios
      .get(url, {})
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

// Post request
export const httpPost = ({ url, data }: IHttpParams) =>
  new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

// Delete request
export const httpDelete = ({ url }: IHttpParams) =>
  new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })

// Put request
export const httpPut = ({ url, data }: IHttpParams) =>
  new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
