export type UserId = string

export interface Profile {
  id: UserId
  username: string
  website?: string
  updatedAt?: string
  avatarUrl: string
}
