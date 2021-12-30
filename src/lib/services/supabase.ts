import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_URL
)

export const auth = supabase.auth
export const storage = supabase.storage
