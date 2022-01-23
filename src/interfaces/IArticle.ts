export interface IArticle {
  _id?: string
  title?: string
  description?: string
  classification?: IArticleCategory[]
  markdown?: string
  html?: string
  isVisible?: string
  createdAt?: string
  updatedAt?: string
}

export interface IArticles {
  articles: IArticle[]
}

export interface IArticleCategory {
  _id?: string
  name?: string
}

export type IHttpArticle = {
  article: IArticle[]
}
