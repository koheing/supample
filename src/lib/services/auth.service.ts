import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const { error, user } = await supabase.auth.signUp({ email, password })
  console.log(error)

  return user
}

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const { error, user } = await supabase.auth.signIn({ email, password })
  console.log(error)

  return user
}

export const onAuthStateChanged = (
  callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]
) => {
  return supabase.auth.onAuthStateChange(callback)
}

export const getSignedInUser = () => supabase.auth.user() ?? null
