<script lang="ts">
  import Icon from 'svelte-awesome'

  let clazz = ''
  export { clazz as class }
  export let data: unknown
  export let scale = 1.0
  export let disabled = false
</script>

<button on:click class={clazz} {disabled}>
  <Icon {data} {scale} />
</button>

<style>
  button {
    cursor: pointer;
    padding: 0.2rem;
  }
  button:hover {
    background-color: #f0f0f0;
    border-radius: 2rem;
  }
</style>
