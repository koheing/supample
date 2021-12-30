import { storage } from './supabase'
import { v4 } from 'uuid'

export const upload = async (userId: string, file: File): Promise<string> => {
  const { data, error } = await storage.from('avatars').upload(`${userId}/${v4()}${file.type}`, file)
  return data.Key
}
