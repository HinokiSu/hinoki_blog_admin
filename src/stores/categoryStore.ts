import { ICategories, ICategory } from '@admin/interfaces/ICategory'
import { httpDelete, httpGet, httpPost, httpPut } from '@admin/utils'
import { defineStore } from 'pinia'

interface IState {
  categoryList: ICategory[]
  categoryData: ICategory
  fettle: boolean
}

export const useCategoryStore = defineStore('category', {
  state: (): IState => ({
    categoryList: [],
    categoryData: {},
    fettle: false,
  }),

  getters: {},

  actions: {
    async createCategory() {
      try {
        const result = <ICategories>await httpPost({ url: '/category/new' })
        this.fettle = true
      } catch (error) {
        this.fettle = false
        console.log(`err: ${error}`)
        return error
      }
    },

    async getCategoryList() {
      try {
        const result = <ICategories>await httpGet({ url: '/category/all' })
        this.categoryList = result.categories
        this.fettle = true
      } catch (error) {
        this.fettle = false
        console.log(`err: ${error}`)
        return error
      }
    },

    // TODO: Need fix
    async getCategoryById(id: string) {
      try {
        const result = <ICategory>await httpGet({ url: `/category/${id}` })
        this.categoryData = result
        this.fettle = true
      } catch (error) {
        this.fettle = false
        console.log(`err: ${error}`)
        return error
      }
    },

    async updateCategory(id: string) {
      try {
        const result = <ICategories>await httpPut({ url: `/category/${id}` })
        // this.categoryData = result.category
        this.fettle = true
      } catch (error) {
        this.fettle = false
        console.log(`err: ${error}`)
        return error
      }
    },

    async deleteCategory(id: string) {
      try {
        const result = <ICategories>await httpDelete({ url: `/category/${id}` })
        this.fettle = true
      } catch (error) {
        this.fettle = false
        console.log(`err: ${error}`)
        return error
      }
    },
  },
})
