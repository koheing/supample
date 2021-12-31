import { userId } from '../stores/auth.store'
import { create, subscribe } from '../stores/profile.store'

userId.subscribe((id) => {
  if (!id) return

  void create({ id })
  // void subscribe()
})

export default {}
