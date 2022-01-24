export interface ICategory {
  _id?: string
  name?: string
  createdAt?: string
  updatedAt?: string
}

export interface ICategories {
  categories: ICategory[]
}
