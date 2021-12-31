import { getSignedUrl } from '../services/storage.service'

const map = new Map<string, string>()

export const getAccesibleUrl = async (path: string) => {
  if (map.size > 500) map.clear()

  const exists = map.has(path)
  if (exists) return map.get(path)
  const avatar = await getSignedUrl(path)
  map.set(path, avatar)
  return avatar
}
