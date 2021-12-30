<svelte:options immutable />

<script lang="ts">
  import { push } from 'svelte-spa-router'
  import Avatar from './Avatar.svelte'

  export let avatar = ''
  export let userId = ''

  async function onClick() {
    await push('/profiles/' + userId)
  }
</script>

<div class="header">
  <div class="title"><slot /></div>
  <div class="avatar">
    <Avatar url={avatar} alt={userId} scale={2.1} on:click={onClick} />
  </div>
</div>

<style>
  .header {
    width: 100%;
    height: 3rem;
    background-color: #ec9f62;
    box-shadow: 0 0.1rem 0.4rem #ec9f62;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
  }

  .title {
    padding: 0 1rem;
    color: var(--bg-color);
  }

  .avatar {
    padding: 0 1rem;
  }
</style>
