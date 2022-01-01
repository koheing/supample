<svelte:options immutable />

<script lang="ts">
  import type { UserId, Profile } from '../../../models/profile.model'
  import Avatar from '../../../views/atoms/Avatar.svelte'
  import type { Message } from '../../../models/message.model'

  export let message: Message
  export let profile: Profile
  export let myId: UserId

  $: mine = message.createdBy === myId
</script>

{#if mine}
  <div class="mine message">
    <div class="bubble">
      <div class="text">
        {message.text}
      </div>
    </div>
    <div class="avatar"><Avatar url={profile.avatarUrl} alt={profile.username} /></div>
  </div>
{:else}
  <div class="others message">
    <div class="avatar"><Avatar url={profile.avatarUrl} alt={profile.username} /></div>
    <div class="bubble">
      <div class="text">{message.text}</div>
    </div>
  </div>
{/if}

<style>
  .message {
    display: flex;
    flex-direction: row;
    padding: 1rem;
  }

  .bubble {
    margin: auto;
  }

  .mine > .bubble {
    margin-right: 0;
  }

  .mine > .avatar {
    margin-left: 2rem;
  }

  .mine > .bubble > .text {
    padding: 1rem 2rem;
    position: relative;
    background-color: #f0f0f0f0;
    border-radius: 0.75rem;
  }

  .mine > .bubble > .text:after {
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    pointer-events: none;
    position: absolute;
    border-color: rgba(0, 153, 255, 0);
    border-top-width: 0.5rem;
    border-bottom-width: 0.5rem;
    border-left-width: 1rem;
    border-right-width: 0.5rem;
    margin-top: -0.5rem;
    border-left-color: #f0f0f0f0;
    top: 1.25rem;
    right: -1.25rem;
    z-index: 1;
  }

  .others > .bubble {
    margin-left: 0;
  }

  .others > .bubble > .text {
    padding: 1rem 2rem;
    position: relative;
    background-color: #f0f0f0f0;
    border-radius: 0.75rem;
  }

  .others > .bubble > .text:before {
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    pointer-events: none;
    position: absolute;
    border-color: rgba(0, 153, 255, 0);
    border-top-width: 0.5rem;
    border-bottom-width: 0.5rem;
    border-left-width: 1rem;
    border-right-width: 0.5rem;
    margin-top: -0.5rem;
    border-left-color: #f0f0f0f0;
    top: 1.25rem;
    left: -1.25rem;
    border-radius: 5%;
    transform: rotate(180deg);
    z-index: 1;
  }

  .others > .avatar {
    margin-right: 2rem;
  }
</style>
