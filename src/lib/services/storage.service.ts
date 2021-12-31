import { storage } from './supabase'

const avatars = 'avatars'

export const upload = async (path: string, file: File): Promise<string> => {
  const { data, error } = await storage.from(avatars).upload(path, file)

  console.log(error)
  return data.Key
}

export const getSignedUrl = async (path: string) => {
  const { signedURL, error } = await storage.from(avatars).createSignedUrl(path, 36000000)
  console.log(error)

  return signedURL
}
