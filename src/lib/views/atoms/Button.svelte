<script lang="ts">
  export let disabled = false
</script>

<button on:click {disabled}>
  <span><slot /></span>
</button>

<style>
  button {
    border: 0.1rem solid var(--ac-color);
    text-decoration: none;
    text-align: center;
    color: var(--ac-color);
    border-radius: 1rem;
    padding: 0.5rem;
    width: 100%;
  }

  button:hover {
    text-decoration: none;
    text-align: center;
    color: var(--bg-color);
    border-radius: 1rem;
    padding: 0.5rem;
    background-color: var(--ac-color);
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
</style>
