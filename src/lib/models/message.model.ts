import type { UserId } from './profile.model'

export type MessageId = number

export interface Message {
  id: MessageId
  text: string
  createdBy: UserId
  createdAt: string
  updatedAt: string
}
