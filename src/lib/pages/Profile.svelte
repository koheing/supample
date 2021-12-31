<script lang="ts">
  import Header from '../views/atoms/Header.svelte'
  import { userId } from '../stores/auth.store'
  import { params } from 'svelte-spa-router'
  import Avatar from '../views/atoms/Avatar.svelte'
  import Icon from 'svelte-awesome'
  import { edit } from 'svelte-awesome/icons'
  import { profile, updateAvatar } from '../stores/profile.store'

  let files: FileList | null = null
  let refId = ''
  $: if ($params) refId = $params.userId ?? ''
  $: mine = refId === $userId
  $: avatar = $profile?.avatarUrl ?? ''

  $: if (files && files[0] !== null) updateAvatar($userId, files[0])
</script>

<div class="layout">
  <Header {avatar} userId={$userId}>Todo List</Header>

  <div class="avatar">
    <label for="upload">
      <Avatar scale={7} url={avatar}>
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
</div>

<style>
  .layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
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
