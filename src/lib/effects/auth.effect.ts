import { userId } from '../stores/auth.store'
import { create, subscribe as subscribeProfiles } from '../stores/profile.store'
import { subscribe as subscribeMessages } from '../stores/message.store'

userId.subscribe((id) => {
  if (!id || id === '') return

  void create({ id }).then(subscribeProfiles).then(subscribeMessages)
})

export default {}
