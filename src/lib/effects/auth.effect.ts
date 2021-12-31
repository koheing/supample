import { userId } from '../stores/auth.store'
import { create } from '../stores/profile.store'

userId.subscribe((id) => {
  if (!id) return

  void create({ id })
})

export default {}
