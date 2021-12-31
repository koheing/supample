import { derived, writable, get } from 'svelte/store'
import type { Profile, UserId } from '../models/profile.model'
import { createProfile, selectProfileById, updateProfile } from '../services/profile.service'
import { getSignedUrl, upload } from '../services/storage.service'
import { v4 } from 'uuid'

interface State {
  mine: Profile | null
  all: Profile[]
  loading: boolean
  loaded: boolean
  watching: boolean
}

const init = {
  mine: null,
  all: [],
  loading: false,
  loaded: false,
  watching: false,
} as State

const store = writable<State>(init)

export const profile = derived(store, (state) => state.mine)
export const loading = derived(store, (state) => state.loading)
export const loaded = derived(store, (state) => state.loaded)
export const avatar = derived(store, (state) => state.mine?.avatarUrl ?? '')

export const create = async (profile: Partial<Profile> & Pick<Profile, 'id'>) => {
  store.update((state) => ({ ...state, loading: true, loaded: false }))

  const p = await selectProfileById(profile.id)
  if (!p) await createProfile(profile)

  store.update((state) => ({
    ...state,
    mine: p ?? { username: '', avatarUrl: '', ...profile },
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
    mine: { ...state.mine, ...p },
    loading: false,
    loaded: true,
  }))
}

export const updateAvatar = async (id: UserId, file: File) => {
  store.update((state) => ({ ...state, loading: true, loaded: false }))

  const avatarUrl = `${id}/${v4()}.png`
  await upload(avatarUrl, file)
  await updateProfile({ id, avatarUrl })

  store.update((state) => ({
    ...state,
    mine: { ...state.mine, avatarUrl },
    loading: false,
    loaded: true,
  }))
}

export const subscribe = () => {}
