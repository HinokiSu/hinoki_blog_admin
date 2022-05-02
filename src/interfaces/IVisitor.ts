export interface IVisitor {
  _id?: string
  nickname?: string
  email?: string
  createdAt?: string
}

export interface IVisitors {
  visitors: IVisitor[]
}

export interface IBaseVisitor {
  _id?: string
  nickname?: string
  email?: string
}
