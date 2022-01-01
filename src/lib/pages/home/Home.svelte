<script lang="ts">
  import Header from '../../views/atoms/Header.svelte'
  import { userId } from '../../stores/auth.store'
  import { profile } from '../../stores/profile.store'
  import TextInput, { ValidateEvent } from '../../views/atoms/TextInput.svelte'
  import Button from '../../views/atoms/Button.svelte'
  import { required } from '../../utils/validator'
  import Comment from './presentations/Comment.svelte'

  let disabled = true
  $: avatar = $profile?.avatarUrl ?? ''

  function onValidate(e: ValidateEvent) {
    disabled = !e.detail.valid
  }
</script>

<div class="layout">
  <Header {avatar} userId={$userId}>Dalack</Header>

  <div class="comments">
    <Comment
      message={{
        id: 123,
        createdBy: 'user1',
        text: 'トコメントコントコメントコメントコメントコメントコメントコメントコメントコメントコントコメントコメントコメントコメント',
        createdAt: '',
        updatedAt: '',
      }}
      profile={{ id: 'user1', username: 'test', avatarUrl: '' }}
      myId={'user1'}
    />
    <Comment
      message={{ id: 1123, createdBy: 'user2', text: 'トコント', createdAt: '', updatedAt: '' }}
      profile={{ id: 'user2', username: 'test', avatarUrl: '' }}
      myId={'user1'}
    />
  </div>

  <div class="footer">
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

  .comments {
    overflow-y: scroll;
    height: calc(100% - 4rem - 5.5rem);
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
