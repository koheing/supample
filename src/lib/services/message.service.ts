import type { SupabaseRealtimePayload } from '@supabase/supabase-js'
import type { Message, MessageId } from '../models/message.model'
import { supabase } from './supabase'

const table = 'messages'

export const createMessage = async (message: Omit<Message, 'createdAt' | 'id'>) => {
  const { data, error } = await supabase.from<Message>(table).insert(message)
  console.log(error, data)
}

export const deleteMessage = async (id: MessageId) => {
  const { error } = await supabase.from(table).delete().match({ id })
  console.log(error)
}

export const selectAllMessages = async () => {
  const { data, error } = await supabase.from<Message>(table).select()
  console.log(error)

  return data ?? []
}

export const subscribeMessage = (callback: (payload: SupabaseRealtimePayload<Message>) => void) => {
  const subscription = supabase.from(table).on('*', callback).subscribe()

  return () => supabase.removeSubscription(subscription)
}
