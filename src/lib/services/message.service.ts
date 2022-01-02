import type { SupabaseRealtimePayload } from '@supabase/supabase-js'
import type { Message } from '../models/message.model'
import { supabase } from './supabase'

const messages = 'messages'

export const createMessage = async (message: Omit<Message, 'createdAt' | 'id'>) => {
  const { data, error } = await supabase.from<Message>(messages).insert(message)
  console.log(error, data)
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
