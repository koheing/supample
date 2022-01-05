import { createClient } from '@supabase/supabase-js'
import configuration from '../environments/configuration'

export const supabase = createClient(configuration.supabase.url, configuration.supabase.publicKey)
