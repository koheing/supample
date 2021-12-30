<script lang="ts">
  import Header from '../views/atoms/Header.svelte'
  import { userId } from '../stores/auth.store'
  import { params } from 'svelte-spa-router'
  import Avatar from '../views/atoms/Avatar.svelte'
  import Icon from 'svelte-awesome'
  import { edit } from 'svelte-awesome/icons'

  let files: FileList
  let refId = ''
  $: if ($params) refId = $params.userId ?? ''
  $: mine = refId === $userId
</script>

<div class="layout">
  <Header avatar={''} userId={$userId}>Todo List</Header>

  <label for="upload">
    <div class="avatar">
      <Avatar scale={7} url={''}>
        <div class="edit">
          <Icon data={edit} scale={1.5} />
        </div>
      </Avatar>
    </div>
    <input
      type="file"
      id="upload"
      accept="image/png, image/jpeg"
      style="display: none;"
      bind:files
    />
  </label>
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
