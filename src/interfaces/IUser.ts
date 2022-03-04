export interface IUser {
  user_id: string | null
  username: string | null
  access_token: string | null
}

export interface ILoginUser {
  username: string
  password: string
}
