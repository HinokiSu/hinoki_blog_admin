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
}

export interface IArticles {
  articles: IArticle[]
}

export type IHttpArticle = {
  article: IArticle[]
}
