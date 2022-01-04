import { userId } from '../stores/auth.store'
import { fetchMine, subscribe as subscribeProfiles } from '../stores/profile.store'
import { subscribe as subscribeMessages } from '../stores/message.store'

userId.subscribe((id) => {
  if (!id || id === '') return

  void fetchMine({ id }).then(subscribeProfiles).then(subscribeMessages)
})

export default {}
