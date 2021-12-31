import type { User } from '@supabase/supabase-js'
import { auth } from './supabase'

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const { error, user } = await auth.signUp({ email, password })
  console.log(error)

  return user
}

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const { error, user } = await auth.signIn({ email, password })
  console.log(error)

  return user
}

export const onAuthStateChanged = (callback: Parameters<typeof auth.onAuthStateChange>[0]) => {
  return auth.onAuthStateChange(callback)
}

export const getSignedInUser = () => auth.user() ?? null
