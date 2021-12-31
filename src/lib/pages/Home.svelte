<script lang="ts">
  import Header from '../views/atoms/Header.svelte'
  import { userId } from '../stores/auth.store'
  import { profile } from '../stores/profile.store'
  import TextInput, { ValidateEvent } from '../views/atoms/TextInput.svelte'
  import Button from '../views/atoms/Button.svelte'
  import { required } from '../utils/validator'
  import Avatar from '../views/atoms/Avatar.svelte'

  let disabled = true
  $: avatar = $profile?.avatarUrl ?? ''

  function onValidate(e: ValidateEvent) {
    disabled = !e.detail.valid
  }
</script>

<div class="layout">
  <Header {avatar} userId={$userId}>Dalack</Header>

  <div class="comment">
    <div class="bubble">
      <div class="mine">
        トコメントコントコメントコメントコメントコメントコメントコメントコメントコメントコントコメントコメントコメントコメント
      </div>
    </div>
    <div class="avatar"><Avatar /></div>
  </div>

  <div class="comment">
    <div class="avatar"><Avatar /></div>
    <div class="bubble">
      <div class="others">
        コメントコメントコメントコメントコントコメントコメントコメントコメント
      </div>
    </div>
  </div>

  <div class="form">
    <div class="text">
      <TextInput showError={false} validators={[required]} on:validate={onValidate} />
    </div>
    <div class="button"><Button {disabled}>送信</Button></div>
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

  .comment {
    display: flex;
    flex-direction: row;
    padding: 1rem;
  }

  .bubble {
    margin: auto;
  }

  .mine {
    padding: 1rem 2rem;
    position: relative;
    background-color: #f0f0f0f0;
    border-radius: 0.75rem;
    width: 95%;
  }

  .mine:after {
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

  .others {
    padding: 1rem 2rem;
    position: relative;
    background-color: #f0f0f0f0;
    border-radius: 0.75rem;
    width: 95%;
  }

  .others:before {
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

  .form {
    -webkit-position: sticky;
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;
    box-shadow: 0.1rem 0.1rem 0.4rem var(--fg-color);
    max-height: 5.5rem;
    padding: 1rem 0;
    display: flex;
    flex-direction: row;
  }

  .text {
    flex-grow: 8;
    padding: 0 1rem;
  }

  .button {
    flex-grow: 1;
    padding: 0 1rem;
  }
</style>
