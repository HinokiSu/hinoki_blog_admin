import { ICategories, ICategory } from '@admin/interfaces/ICategory'
import { httpDelete, httpGet, httpPost, httpPut } from '@admin/utils/axios'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface IState {
  categoryList: ICategory[]
  categoryData: ICategory
}

export const useCategoryStore = defineStore('category', {
  state: (): IState => ({
    categoryList: [],
    categoryData: {},
  }),

  getters: {
    categoryCount: (state) => state.categoryList.length,
  },

  actions: {
    // 创建类别
    async createCategory() {
      try {
        const result = <ICategories>await httpPost({ url: '/category/new', data: this.categoryData })
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    // 获取所有类别
    async getCategoryList() {
      try {
        const result = <ICategories>await httpGet({ url: '/category/all' })
        this.categoryList = result.categories.map((item) => {
          return {
            _id: item._id,
            name: item.name,
            createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm'),
            updatedAt: item.updatedAt,
          }
        })
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    // 根据Id 获取类别
    async getCategoryById(id: string) {
      try {
        const result = <ICategory>await httpGet({ url: `/category/${id}` })
        this.categoryData = result
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    // 更新类别
    async updateCategory(id: string) {
      try {
        const result = <ICategories>await httpPut({ url: `/category/${id}` })
        // this.categoryData = result.category
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    // 删除类别
    async deleteCategory(id: string) {
      try {
        const result = <ICategories>await httpDelete({ url: `/category/${id}` })
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },
    // recycle data
    recycleCategoryData() {
      this.categoryData = {}
    },
  },
})
