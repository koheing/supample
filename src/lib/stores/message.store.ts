import type { Message } from '../models/message.model'
import { selectAllMessages, subscribeMessage } from '../services/message.service'
import { derived, writable } from 'svelte/store'
import type { Unsubscriber } from 'svelte/store'

interface State {
  messages: Message[]
  loading: boolean
  loaded: boolean
}

const init = {
  messages: [],
  loaded: false,
  loading: false,
} as State

const store = writable<State>(init)

export const messages = derived(store, (state) => state.messages)
export const loaded = derived(store, (state) => state.loaded)
export const loading = derived(store, (state) => state.loading)

let subscription: Unsubscriber | null = null

export const subscribe = async () => {
  if (subscription) {
    subscription()
    subscription = null
  }

  const messages = await selectAllMessages()
  store.update((state) => ({ ...state, messages }))

  subscription = subscribeMessage((payload) => {
    if ((payload.errors?.length ?? 0) > 0) throw payload.errors[0]

    store.update((state) => {
      switch (payload.eventType) {
        case 'UPDATE': {
          const ms = state.messages.slice()
          const newer = payload.new
          const index = ms.findIndex((it) => it.id === newer.id)
          ms.splice(index, 1, newer)

          return { ...state, messages: ms }
        }
        case 'INSERT': {
          const newer = payload.new
          return { ...state, messages: [...state.messages, newer] }
        }
        case 'DELETE': {
          const ms = state.messages.slice()
          const older = payload.old
          const index = ms.findIndex((it) => it.id === older.id)
          ms.splice(index, 1)
          return { ...state, messages: ms }
        }
      }
    })
  })
}