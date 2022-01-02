<svelte:options immutable />

<script lang="ts">
  import type { UserId } from '../../../models/profile.model'
  import Avatar from '../../../views/atoms/Avatar.svelte'
  import type { Message } from '../../../models/message.model'
  import { profileOf } from '../../../stores/profile.store'
  import { trash } from 'svelte-awesome/icons'
  import IconButton from '../../../views/atoms/IconButton.svelte'
  import { cancel } from '../../../stores/message.store'

  export let message: Message
  export let myId: UserId

  let hidden = true

  $: mine = message.createdBy === myId
  $: profile = profileOf(message.createdBy)
  $: timestamp = new Date(message.createdAt).toLocaleString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })

  function onMouseEnter() {
    hidden = false
  }

  function onMouseLeave() {
    hidden = true
  }

  async function onClick() {
    await cancel(message.id)
  }
</script>

{#if mine}
  <div class="mine message">
    <div class="bubble">
      <div class="username">{$profile?.username ?? '名無し'}</div>
      <div class="text" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
        <div class="timestamp">{timestamp}</div>
        {#if !hidden}
          <div class="tool">
            <div class="trash"><IconButton data={trash} scale={2.5} on:click={onClick} /></div>
          </div>
        {/if}
        {message.text}
      </div>
    </div>
    <div class="avatar">
      <Avatar url={$profile?.avatarUrl ?? ''} alt={$profile?.username ?? ''} scale={3} />
    </div>
  </div>
{:else}
  <div class="others message">
    <div class="avatar">
      <Avatar url={$profile?.avatarUrl ?? ''} alt={$profile?.username ?? ''} scale={3} />
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
    position: relative;
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

  .mine > .bubble > .text:hover {
    background-color: rgba(168, 168, 168, 0.8);
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
    margin-top: -0.3rem;
    border-left-color: #f0f0f0f0;
    top: 1rem;
    right: -1.45rem;
    z-index: 1;
  }

  .mine > .bubble > .text:hover:after {
    border-left-color: rgba(168, 168, 168, 0.8);
  }

  .tool {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 50%;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .trash {
    align-self: center;
    color: var(--bg-color);
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
    margin-top: -0.3rem;
    border-left-color: #f0f0f0f0;
    top: 1rem;
    left: -1.45rem;
    border-radius: 5%;
    transform: rotate(180deg);
    z-index: 1;
  }

  .others > .avatar {
    margin-right: 2rem;
  }
</style>
