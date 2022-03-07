import { ICategories, ICategory } from '@admin/interfaces/ICategory'
import { httpDelete, httpGet, httpPost, httpPut } from '@admin/utils/axios'
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
    async createCategory() {
      try {
        const result = <ICategories>await httpPost({ url: '/category/new', data: this.categoryData })
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    async getCategoryList() {
      try {
        const result = <ICategories>await httpGet({ url: '/category/all' })
        this.categoryList = result.categories
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    // TODO: Need fix
    async getCategoryById(id: string) {
      try {
        const result = <ICategory>await httpGet({ url: `/category/${id}` })
        this.categoryData = result
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

    async updateCategory(id: string) {
      try {
        const result = <ICategories>await httpPut({ url: `/category/${id}` })
        // this.categoryData = result.category
      } catch (error) {
        console.log(`err: ${error}`)
        return error
      }
    },

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
