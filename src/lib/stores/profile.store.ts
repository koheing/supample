import { derived, writable, get } from 'svelte/store'
import type { Profile, UserId } from '../models/profile.model'
import { createProfile, selectProfileById, updateProfile } from '../services/profile.service'
import { getSignedUrl, upload } from '../services/storage.service'
import { v4 } from 'uuid'

interface State {
  profile: Profile | null
  loading: boolean
  loaded: boolean
  watching: boolean
}

const init = {
  profile: null,
  loading: false,
  loaded: false,
  watching: false,
} as State

const store = writable<State>(init)

export const profile = derived(store, (state) => state.profile)
export const loading = derived(store, (state) => state.loading)
export const loaded = derived(store, (state) => state.loaded)
export const avatar = derived(store, (state) => state.profile?.avatarUrl ?? '')

export const create = async (profile: Partial<Profile> & Pick<Profile, 'id'>) => {
  store.update((state) => ({ ...state, loading: true, loaded: false }))

  const p = await selectProfileById(profile.id)
  if (!p) await createProfile(profile)
  if (p.avatarUrl) p.avatarUrl = await getSignedUrl(p.avatarUrl)

  store.update((state) => ({
    ...state,
    profile: p ?? { username: '', avatarUrl: '', ...profile },
    loading: false,
    loaded: true,
  }))
}

export const updateUserName = async (name: string) => {
  store.update((state) => ({ ...state, loading: true, loaded: false }))

  const p = { ...get(profile), username: name } as Profile
  delete p.avatarUrl

  await updateProfile(p)

  store.update((state) => ({
    ...state,
    profile: { ...state.profile, ...p },
    loading: false,
    loaded: true,
  }))
}

export const updateAvatar = async (id: UserId, file: File) => {
  store.update((state) => ({ ...state, loading: true, loaded: false }))

  const avatarUrl = `${id}/${v4()}.png`
  await upload(avatarUrl, file)
  await updateProfile({ id, avatarUrl })
  const path = await getSignedUrl(avatarUrl)

  store.update((state) => ({
    ...state,
    profile: { ...state.profile, avatarUrl: path },
    loading: false,
    loaded: true,
  }))
}
