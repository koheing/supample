import { auth } from './supabase'

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
  const { error } = await auth.signUp({ email, password })
  console.log(error)
}

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  const { error, user, session } = await auth.signIn({ email, password })

  console.log(error)
}

export const onAuthStateChanged = (callback: Parameters<typeof auth.onAuthStateChange>[0]) => {
  return auth.onAuthStateChange(callback)
}

export const getSignedInUser = () => auth.user()
