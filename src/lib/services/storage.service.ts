import { supabase } from './supabase'

const table = 'avatars'

export const upload = async (path: string, file: File): Promise<string> => {
  const { data, error } = await supabase.storage.from(table).upload(path, file)

  console.log(error)
  return data.Key
}

export const getSignedUrl = async (path: string) => {
  const { signedURL, error } = await supabase.storage.from(table).createSignedUrl(path, 36000000)
  console.log(error)

  return signedURL
}
