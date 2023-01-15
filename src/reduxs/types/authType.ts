export interface UserInfo {
  fullName: string
  nickName: string
  email: string
  phone: string
  gender: 'male' | 'female'
  avatar: string
  dateOfBirth: string
}

export interface AuthState {
  isAuth: boolean
  token: string
  refreshToken: string
  showBoarding: boolean
  typeLogin: TypeLogin | string
  user: UserInfo
}

export enum TypeLogin {
  google = 'google',
  facebook = 'facebook',
  twitter = 'twitter',
  apple = 'apple',
  email_password = 'email_password',
}

export interface ResponseData {
  accessToken?: string
  refreshToken?: string
  typeLogin?: string
}

export interface ParamLoginEP {
  username: string
  password: string
}
