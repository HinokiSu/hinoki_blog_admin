import { IBaseVisitor } from './IVisitor'

export interface IComment {
  _id?: string
  children_comments: []
  content?: string
  article_id?: string
  visitor?: IBaseVisitor
  createdAt?: string
}

export interface IChildComment {
  reply_to_visitor?: string
  content?: string
  createdAt?: string
}

export interface ICommentList {
  comments: IComment[]
}
