<svelte:options immutable />

<script lang="ts">
  import { onAuthChanged, authenticated, watching } from '../../stores/auth.store'
  import { location, push } from 'svelte-spa-router'
  import { requireAuth } from '../../router'

  $: if ($watching && !$authenticated && requireAuth($location)) push('/signin')

  onAuthChanged()
</script>

{#if $watching}
  <slot />
{:else}
  <div>AAA</div>
{/if}
