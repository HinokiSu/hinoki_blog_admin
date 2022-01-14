export interface IArticle {
  _id?: string
  title?: string
  description?: string
  markdown?: string
  html?: string
  createdAt?: string
  updatedAt?: string
}

export interface IArticles {
  articles: IArticle[]
}



export type IHttpArticle = {
  article: IArticle
}
