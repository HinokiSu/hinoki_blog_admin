export interface IArticle {
  _id?: string
  title?: string
  description?: string
  classification?: Array<IArticleCategory>
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
  _id: String
  name: String
}

export type IHttpArticle = {
  article: IArticle[]
}
