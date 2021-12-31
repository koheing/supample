import type { SupabaseRealtimePayload } from '@supabase/supabase-js'
import type { Unsubscriber } from 'svelte/store'
import type { Profile, UserId } from '../models/profile.model'
import { supabase } from './supabase'

const profile = 'profiles'

export const createProfile = async (user: Partial<Profile> & Pick<Profile, 'id'>) => {
  await supabase.from<Profile>(profile).insert(user)
}

export const updateProfile = async (user: Partial<Profile> & Pick<Profile, 'id'>) => {
  const { error } = await supabase.from<Profile>(profile).update(user).match({ id: user.id })
  console.log(error)
}

export const deleteProfile = async (user: Partial<Profile> & Pick<Profile, 'id'>) => {
  await supabase.from<Profile>(profile).delete().match({ id: user.id })
}

export const selectProfileById = async (id: UserId) => {
  const { data, error } = await supabase.from<Profile>(profile).select().eq('id', id)

  return data[0] ?? null
}

export const subscribeProfileById = (
  userId: UserId,
  callback: (payload: SupabaseRealtimePayload<Profile>) => void
): Unsubscriber => {
  const subscription = supabase
    .from<Profile>(`${profile}:id=eq.${userId}`)
    .on('*', callback)
    .subscribe()

  return () => supabase.removeSubscription(subscription)
}
