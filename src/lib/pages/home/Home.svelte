<script lang="ts">
  import Header from '../../views/atoms/Header.svelte'
  import { userId } from '../../stores/auth.store'
  import { profile } from '../../stores/profile.store'
  import TextInput from '../../views/atoms/TextInput.svelte'
  import type { ValidateEvent } from '../../views/atoms/TextInput.svelte'
  import Button from '../../views/atoms/Button.svelte'
  import { required } from '../../utils/validator'
  import Message from './containers/Message.svelte'
  import type { DeleteEvent } from './containers/Message.svelte'
  import { cancel, messages, post } from '../../stores/message.store'
  import { onDestroy, onMount, tick } from 'svelte'

  let disabled = true
  let message = ''
  let el: Element | null = null
  let reachedBottom = true
  $: avatar = $profile?.avatarUrl ?? ''
  $: if ($messages.length && reachedBottom && el)
    tick().then(() => el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }))

  function onValidate(e: ValidateEvent) {
    disabled = !e.detail.valid
  }

  async function onKeyPress(e: KeyboardEvent) {
    if (!e.shiftKey || e.key !== 'Enter') return
    await post($userId, message)
    message = ''
    disabled = true
  }

  async function onClick() {
    await post($userId, message)
    message = ''
    disabled = true
  }

  async function onDelete({ detail }: DeleteEvent) {
    await cancel(detail.id)
  }

  function onScroll() {
    if (!el) return
    reachedBottom = el.scrollHeight - el.scrollTop === el.clientHeight
  }

  onMount(() => {
    el = document.querySelector('.messages')
    el.addEventListener('scroll', onScroll, { passive: true })
  })

  onDestroy(() => {
    el.removeEventListener('scroll', onScroll)
  })
</script>

<div class="layout">
  <Header {avatar} userId={$userId}>Dalack</Header>

  <div class="messages">
    {#each $messages as message}
      <Message {message} myId={$userId} on:delete={onDelete} />
    {/each}
  </div>

  <div class="footer">
    <div class="text">
      <TextInput
        bind:value={message}
        showError={false}
        validators={[required]}
        on:validate={onValidate}
        on:keypress={onKeyPress}
      />
    </div>
    <div class="button"><Button {disabled} on:click={onClick}>送信</Button></div>
  </div>
</div>

<style>
  .layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .messages {
    overflow-y: scroll;
    height: calc(100% - 4rem - 4.5rem);
  }

  .footer {
    position: sticky;
    top: 100vh;
    width: 100%;
    box-shadow: 0.1rem 0.1rem 0.4rem var(--fg-color);
    max-height: 5.5rem;
    padding: 1rem 0;
    display: flex;
    flex-direction: row;
  }

  .footer > .text {
    flex-grow: 20;
    padding: 0 1rem;
  }

  .footer > .button {
    flex-grow: 1;
    padding: 0 1rem;
  }
</style>
