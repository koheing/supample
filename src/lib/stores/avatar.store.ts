import { getSignedUrl } from '../services/storage.service'
import decode from 'jwt-decode'

const map = new Map<string, string>()

export const getAccesibleUrl = async (path: string) => {
  if (map.size > 500) map.clear()

  const exists = map.has(path)
  if (!exists) {
    const avatar = await getSignedUrl(path)
    map.set(path, avatar)
    return avatar
  }

  const currentPath = map.get(path)
  const { exp } = decode<{ exp: number }>(currentPath)

  if (exp * 1000 - Date.now() > 0) return currentPath

  const avatar = await getSignedUrl(path)
  map.set(path, avatar)
  return avatar
}

export const refresh = async (path: string) => {
  if (!map.has(path)) return

  const avatar = await getSignedUrl(path)
  map.set(path, avatar)
}
