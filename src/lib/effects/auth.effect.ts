import { userId } from '../stores/auth.store'
import {
  fetchMine,
  refresh as refreshProfile,
  subscribe as subscribeProfiles,
} from '../stores/profile.store'
import { refresh as refreshMessage, subscribe as subscribeMessages } from '../stores/message.store'

userId.subscribe((id) => {
  if (!id || id === '') {
    refreshProfile()
    refreshMessage()
    return
  }

  void fetchMine({ id }).then(subscribeProfiles).then(subscribeMessages)
})

export default {}
