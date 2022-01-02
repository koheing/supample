import type { SupabaseRealtimePayload } from '@supabase/supabase-js'
import type { Message, MessageId } from '../models/message.model'
import { supabase } from './supabase'

const messages = 'messages'

export const createMessage = async (message: Omit<Message, 'createdAt' | 'id'>) => {
  const { data, error } = await supabase.from<Message>(messages).insert(message)
  console.log(error, data)
}

export const deleteMessage = async (id: MessageId) => {
  const { error } = await supabase.from(messages).delete().match({ id })
  console.log(error)
}

export const selectAllMessages = async () => {
  const { data, error } = await supabase.from<Message>(messages).select()
  console.log(error)

  return data ?? []
}

export const subscribeMessage = (callback: (payload: SupabaseRealtimePayload<Message>) => void) => {
  const subscription = supabase.from(messages).on('*', callback).subscribe()

  return () => supabase.removeSubscription(subscription)
}
