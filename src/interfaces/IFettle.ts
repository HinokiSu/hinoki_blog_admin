export interface IHttpFettle {
  message: string
  fettle: IFettle[]
}

export interface IFettle {
  value: number
  name: string
}

export type TopArticle = {
  _id: string
  title: string
  totalVisits: number
}

export interface IHttpTopArticle {
  message: string
  fettle: TopArticle[]
}