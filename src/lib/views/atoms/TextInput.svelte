<svelte:options immutable />

<script lang="ts" context="module">
  export type ValidateEventDetail = { valid: boolean }
  export type ValidateEvent = CustomEvent<ValidateEventDetail>
</script>

<script lang="ts">
  import { buildValidator, Validated, Validator } from '../../utils/validator'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher<{ validate: ValidateEventDetail }>()

  export let placeholder = ''
  export let value = ''
  export let validators: Validator[] = []
  export let showError = true
  const validator = buildValidator(...validators)

  let focused = false
  let validated = { valid: true, error: '' } as Validated

  $: touched = touched || ((value?.length ?? 0) > 0 && value !== '')
  $: if (focused && touched) validated = validator(value)
  $: if (validated) dispatch('validate', { valid: validated.valid })

  function onInput() {
    focused = true
  }

  function onBlur() {
    validated = validator(value)
    focused = false
  }

  export function validate() {
    validated = validator(value)
  }
</script>

<div class="input">
  <input bind:value on:input={onInput} on:blur={onBlur} on:keypress {placeholder} />
  {#if showError}
    <div class="error">{validated.error}</div>
  {/if}
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    padding: 0.5rem;
    border-bottom: 0.12rem solid #c1c0c0;
    width: 100%;
  }

  input::placeholder {
    color: #c1c0c0;
  }

  input:focus {
    outline: none;
    border-bottom: 0.12rem solid var(--ac-color);
    transition: 0.4s;
  }

  .error {
    margin: 0.5rem 0;
    color: var(--ac-color);
    font-size: 0.8rem;
    min-height: 1.25rem;
  }
</style>
