import { derived, writable, get } from 'svelte/store'
import type { Unsubscriber } from 'svelte/store'
import type { Profile, UserId } from '../models/profile.model'
import {
  createProfile,
  selectAllProfiles,
  selectProfileById,
  subscribeProfiles,
  updateProfile,
} from '../services/profile.service'
import { upload } from '../services/storage.service'
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
export const profileOf = (userId: UserId) =>
  derived(store, (state) => state.all.find((it) => it.id === userId))

export const fetchMine = async (profile: Partial<Profile> & Pick<Profile, 'id'>) => {
  store.update((state) => ({ ...state, loading: true, loaded: false }))

  const p = await selectProfileById(profile.id)

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

let subscription: Unsubscriber | null = null

export const subscribe = async () => {
  if (subscription) {
    subscription()
    subscription = null
  }

  const profiles = await selectAllProfiles()
  store.update((state) => ({ ...state, all: profiles }))

  subscription = subscribeProfiles((payload) => {
    if ((payload.errors?.length ?? 0) > 0) throw payload.errors[0]

    console.log(payload)
    store.update((state) => {
      switch (payload.eventType) {
        case 'UPDATE': {
          const all = state.all.slice()
          const newer = payload.new
          const index = all.findIndex((it) => it.id === newer.id)
          all.splice(index, 1, newer)

          return { ...state, all }
        }
        case 'INSERT': {
          const newer = payload.new
          return { ...state, all: [...state.all, newer] }
        }
        case 'DELETE': {
          const all = state.all.slice()
          const older = payload.old
          const index = all.findIndex((it) => it.id === older.id)
          all.splice(index, 1)
          return { ...state, all }
        }
      }
    })
  })
}
