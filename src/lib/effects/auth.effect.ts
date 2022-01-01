import { userId } from '../stores/auth.store'
import { create, subscribe as subscribeProfiles } from '../stores/profile.store'
import { subscribe as subscribeMessages } from '../stores/message.store'

userId.subscribe((id) => {
  if (!id) return

  void create({ id })
  void subscribeProfiles()
  void subscribeMessages()
})

export default {}
