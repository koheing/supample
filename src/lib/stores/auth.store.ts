import type { Subscription, User } from '@supabase/supabase-js'
import { derived, writable } from 'svelte/store'
import {
  getSignedInUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  signOut as so,
} from '../services/auth.service'

interface State {
  user: User | null
  loading: boolean
  loaded: boolean
  watching: boolean
}

const init = {
  user: null,
  loaded: false,
  loading: false,
  watching: false,
} as State

const store = writable<State>(init)

export const userId = derived(store, (s) => s?.user?.id ?? '')
export const authenticated = derived(store, (s) => !!s && !!s?.user?.id)
export const watching = derived(store, (s) => s.watching)

export const signUp = async (email: string, password: string) => {
  store.update((state) => ({ ...state, loading: true, loaded: false }))

  await signUpWithEmailAndPassword(email, password)

  store.update((state) => ({ ...state, loading: false, loaded: true }))
}

export const signIn = async (email: string, password: string) => {
  store.update((state) => ({ ...state, loading: true, loaded: false }))

  await signInWithEmailAndPassword(email, password)

  store.update((state) => ({ ...state, loading: false, loaded: true }))
}

export const signOut = async () => {
  await so()
}

let subscription: Subscription | null = null

export const onAuthChanged = () => {
  subscription && subscription.unsubscribe()
  if (subscription) subscription = null

  const { data } = onAuthStateChanged((e, s) => {
    console.log(e)
    switch (e) {
      case 'SIGNED_OUT': {
        store.set({ ...init, watching: true })
        break
      }
      default: {
        store.update((state) => ({ ...state, user: s.user, watching: true }))
      }
    }
  })

  store.update((state) => ({ ...state, user: getSignedInUser(), watching: true }))

  subscription = data
}
