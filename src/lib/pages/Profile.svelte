<svelte:options immutable />

<script lang="ts">
  import Header from '../views/atoms/Header.svelte'
  import { userId } from '../stores/auth.store'
  import { params, push } from 'svelte-spa-router'
  import Avatar from '../views/atoms/Avatar.svelte'
  import Icon from 'svelte-awesome'
  import { edit } from 'svelte-awesome/icons'
  import { profile, updateUserName, updateAvatar } from '../stores/profile.store'
  import TextInput, { ValidateEvent } from '../views/atoms/TextInput.svelte'
  import Card from '../views/atoms/Card.svelte'
  import Button from '../views/atoms/Button.svelte'
  import { required, minLength } from '../utils/validator'
  import type { Profile } from '../models/profile.model'

  let valid = false
  let files: FileList | null = null
  let refId = ''
  let username = ''
  let target: Profile | null = null
  $: mine = refId === $userId
  $: avatar = $profile?.avatarUrl ?? ''
  $: if ($profile) target = { ...$profile }
  $: if (target) username = target.username
  $: if ($params) refId = $params.userId ?? ''

  $: if (files && files[0] !== null) updateAvatar($userId, files[0])

  function onValidate({ detail }: ValidateEvent) {
    valid = detail.valid
  }

  async function onClick() {
    !!username && username !== '' && (await updateUserName(username))
    await push('/')
  }
</script>

<div class="layout">
  <Header {avatar} userId={$userId}>Dalack</Header>

  <Card>
    <div class="avatar">
      <label for="upload">
        <Avatar scale={10} url={avatar}>
          {#if mine}
            <div class="edit">
              <Icon data={edit} scale={1.5} />
            </div>
          {/if}
        </Avatar>
        <input
          type="file"
          id="upload"
          accept="image/png, image/jpeg"
          style="display: none;"
          bind:files
        />
      </label>
    </div>

    <div class="inputs">
      <TextInput
        bind:value={username}
        validators={[required, minLength(2)]}
        placeholder="ユーザー名"
        on:validate={onValidate}
      />

      <Button on:click={onClick} disabled={!valid}>登録</Button>
    </div>
  </Card>
</div>

<style>
  .layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .inputs {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
  }

  .avatar {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
  }

  .edit {
    color: black;
    cursor: pointer;
  }
</style>
