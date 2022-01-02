<script lang="ts">
  import SignIn from './lib/pages/SignIn.svelte'
  import Home from './lib/pages/home/Home.svelte'
  import Router from 'svelte-spa-router'
  import Guard from './lib/views/container/Guard.svelte'
  import SignUp from './lib/pages/SignUp.svelte'
  import Profile from './lib/pages/Profile.svelte'
  import type { Path } from './lib/router'
  import type { SvelteComponent } from 'svelte'
  import './lib/effects/auth.effect'

  const routes: Record<Path, typeof SvelteComponent> = {
    '/': Home,
    '/signin': SignIn,
    '/signup': SignUp,
    '/profiles/:userId': Profile,
  }
</script>

<main>
  <Guard>
    <Router {routes} />
  </Guard>
</main>

<style>
  @import 'destyle.css';
  @import '@fontsource/fira-mono';

  :root {
    --fg-color: #787878;
    --bg-color: #fcfcfc;
    --ac-color: #e8873b;
  }

  main {
    color: var(--fg-color);
    background-color: var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
</style>
