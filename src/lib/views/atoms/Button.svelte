<script lang="ts">
  export let disabled = false
  export let type: 'accent' | 'normal' = 'normal'
</script>

<button on:click {disabled} class={type}>
  <span><slot /></span>
</button>

<style>
  button {
    text-decoration: none;
    text-align: center;
    border-radius: 1rem;
    padding: 0.5rem;
    width: 100%;
  }

  button:hover {
    text-decoration: none;
    text-align: center;
    border-radius: 1rem;
    padding: 0.5rem;
    transition: 0.2s;
  }

  button:active {
    animation: ripple 0.3s 1 ease-out;
  }

  @keyframes ripple {
    0% {
      transform: scale(0.99);
    }
    100% {
      transform: scale(1);
    }
  }

  button:disabled {
    border: 0.4rem solid var(--fg-color);
    color: var(--fg-color);
    background-color: #f0f0f0;
    border: none;
    padding: 0.5rem;
    border-radius: 1rem;
  }

  .normal {
    border: 0.1rem solid var(--ac-color);
    color: var(--ac-color);
  }

  .normal:hover {
    color: var(--bg-color);
    background-color: var(--ac-color);
  }

  .normal:disabled {
    background-color: #f0f0f0;
    color: var(--fg-color);
  }

  .accent {
    border: 0.1rem solid #c85c3e;
    color: #c85c3e;
  }

  .accent:hover {
    color: var(--bg-color);
    background-color: #c85c3e;
  }

  .accent:disabled {
    background-color: #f0f0f0;
    color: var(--fg-color);
  }
</style>
