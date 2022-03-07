export interface IArticle {
  _id?: string
  title?: string
  description?: string
  classification?: Array<string>
  markdown?: string
  html?: string
  isVisible?: string
  createdAt?: string
  updatedAt?: string
  totalVisits?: number
}

export type IHttpArticle = {
  articles: IArticle[]
}

export type IPagination = {
  total: number
  articles: IArticle[]
}
