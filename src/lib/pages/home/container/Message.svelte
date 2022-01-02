<svelte:options immutable />

<script lang="ts">
  import type { UserId } from '../../../models/profile.model'
  import Avatar from '../../../views/atoms/Avatar.svelte'
  import type { Message } from '../../../models/message.model'
  import { profileOf } from '../../../stores/profile.store'

  export let message: Message
  export let myId: UserId

  $: mine = message.createdBy === myId
  $: profile = profileOf(message.createdBy)
  $: timestamp = new Date(message.createdAt).toLocaleString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })
</script>

{#if mine}
  <div class="mine message">
    <div class="bubble">
      <div class="username">{$profile?.username ?? '名無し'}</div>
      <div class="text">
        <div class="timestamp">{timestamp}</div>
        {message.text}
      </div>
    </div>
    <div class="avatar">
      <Avatar url={$profile?.avatarUrl ?? ''} alt={$profile?.username ?? ''} scale={2.5} />
    </div>
  </div>
{:else}
  <div class="others message">
    <div class="avatar">
      <Avatar url={$profile?.avatarUrl ?? ''} alt={$profile?.username ?? ''} scale={2.5} />
    </div>
    <div class="bubble">
      <div class="username">{$profile?.username ?? '名無し'}</div>
      <div class="text">
        <div class="timestamp">{timestamp}</div>
        {message.text}
      </div>
    </div>
  </div>
{/if}

<style>
  .message {
    display: flex;
    flex-direction: row;
    padding: 1rem 1.5rem;
    width: 100%;
  }

  .bubble {
    margin: auto;
  }

  .mine > .bubble {
    margin-right: 0;
    max-width: 60%;
  }

  .mine > .avatar {
    margin-left: 2rem;
  }

  .mine > .bubble > .username {
    font-size: x-small;
    text-align: right;
    padding-right: 0.2rem;
    padding-bottom: 0.1rem;
  }

  .mine > .bubble > .text > .timestamp {
    font-size: x-small;
    text-align: right;
    position: absolute;
    bottom: 0rem;
    left: -2.5rem;
  }

  .mine > .bubble > .text {
    padding: 1rem 2rem;
    position: relative;
    background-color: #f0f0f0f0;
    border-radius: 0.75rem;
    overflow-wrap: break-word;
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
    top: 1rem;
    right: -1.25rem;
    z-index: 1;
  }

  .others > .bubble {
    margin-left: 0;
    max-width: 60%;
  }

  .others > .bubble > .username {
    font-size: x-small;
    text-align: left;
    padding-left: 0.2rem;
    padding-bottom: 0.1rem;
  }

  .others > .bubble > .text > .timestamp {
    font-size: x-small;
    text-align: left;
    position: absolute;
    bottom: 0rem;
    right: -2.5rem;
  }

  .others > .bubble > .text {
    padding: 1rem 2rem;
    position: relative;
    background-color: #f0f0f0f0;
    border-radius: 0.75rem;
    overflow-wrap: break-word;
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
    top: 1rem;
    left: -1.25rem;
    border-radius: 5%;
    transform: rotate(180deg);
    z-index: 1;
  }

  .others > .avatar {
    margin-right: 2rem;
  }
</style>
