import type { SupabaseRealtimePayload } from '@supabase/supabase-js'
import type { Unsubscriber } from 'svelte/store'
import type { Profile, UserId } from '../models/profile.model'
import { supabase } from './supabase'

const table = 'profiles'

export const createProfile = async (user: Partial<Profile> & Pick<Profile, 'id'>) => {
  await supabase.from<Profile>(table).insert(user)
}

export const updateProfile = async (user: Partial<Profile> & Pick<Profile, 'id'>) => {
  const { error } = await supabase.from<Profile>(table).update(user).match({ id: user.id })
  console.log(error)
}

export const deleteProfile = async (user: Partial<Profile> & Pick<Profile, 'id'>) => {
  await supabase.from<Profile>(table).delete().match({ id: user.id })
}

export const selectProfileById = async (id: UserId) => {
  const { data, error } = await supabase.from<Profile>(table).select().eq('id', id)
  console.log(error)
  return data[0] ?? null
}

export const selectAllProfiles = async () => {
  const { data, error } = await supabase.from<Profile>(table).select()
  console.log(error)
  return data ?? []
}

export const subscribeProfiles = (
  callback: (payload: SupabaseRealtimePayload<Profile>) => void
): Unsubscriber => {
  const subscription = supabase
    // .from<Profile>(`${profile}:id=eq.${userId}`)
    .from<Profile>(table)
    .on('*', callback)
    .subscribe()

  return () => supabase.removeSubscription(subscription)
}
