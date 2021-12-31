<script lang="ts">
  import Header from '../views/atoms/Header.svelte'
  import { userId } from '../stores/auth.store'
  import { profile } from '../stores/profile.store'

  $: avatar = $profile?.avatarUrl ?? ''
</script>

<div class="layout">
  <Header {avatar} userId={$userId}>Todo List</Header>
</div>

<style>
  .layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
