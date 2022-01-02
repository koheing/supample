<svelte:options immutable />

<script lang="ts">
  import Icon from 'svelte-awesome'
  import { userCircle as user } from 'svelte-awesome/icons'
  import { getAccesibleUrl } from '../../stores/avatar.store'

  export let url = ''
  export let alt = ''
  export let scale = 2.1
  let clazz = ''
  export { clazz as class }
</script>

<div on:click class="relative">
  {#if url !== ''}
    {#await getAccesibleUrl(url)}
      <div class="img {clazz}" style="width: {scale + 0.1}rem; height: {scale + 0.1}rem">
        <Icon data={user} {scale} />
      </div>
    {:then avatarUrl}
      <div class="img" style="width: {scale + 0.1}rem; height: {scale + 0.1}rem">
        <img src={avatarUrl} {alt} class="img" style="width: {scale}rem; height: {scale}rem" />
      </div>
    {:catch}
      <div class="img {clazz}" style="width: {scale + 0.1}rem; height: {scale + 0.1}rem">
        <Icon data={user} {scale} />
      </div>
    {/await}
  {:else}
    <div class="img {clazz}" style="width: {scale + 0.1}rem; height: {scale + 0.1}rem">
      <Icon data={user} {scale} />
    </div>
  {/if}
  <div class="absolute"><slot><div /></slot></div>
</div>

<style>
  .img {
    vertical-align: middle;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    object-fit: cover;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 10;
  }
</style>
