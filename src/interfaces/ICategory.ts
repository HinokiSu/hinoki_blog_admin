export interface ICategory {
  _id?: string
  name?: string
  createdAt?: string
  updatedAt?: string
}

export interface ICategories {
  category: { _id?: string | undefined; name?: string | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; };
  categories: ICategory[]
}
