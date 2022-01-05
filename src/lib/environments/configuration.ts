export default {
  supabase: {
    url: import.meta.env.VITE_URL ?? process.env.VITE_URL,
    publicKey: import.meta.env.VITE_PUBLIC_KEY ?? process.env.VITE_PUBLIC_KEY,
  },
}
