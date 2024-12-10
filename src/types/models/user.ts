import md5 from "crypto-js/md5"

export type User = {
  name: string
  email: string
  password: string
  avatar: string
}

export const userAvatarUrl = (email: string) => `https://gravatar.com/avatar/${md5(email)}`