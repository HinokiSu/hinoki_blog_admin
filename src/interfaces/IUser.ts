export interface IUser {
  user_id: string
  username: string
  access_token: string
}

export interface IBaseUser {
  _id: string
  username: string
  createdAt: string
  updatedAt: string
}

export type IHttpUser = {
  users: IBaseUser[]
}

export interface ILoginUser {
  username: string
  password: string
}

export interface ICreateUser {
  username: string
  pwd: string
  checkPwd: string
}
