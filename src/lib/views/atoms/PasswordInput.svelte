<svelte:options immutable />

<script lang="ts">
  import { buildValidator, Validated, Validator } from '../../utils/validator'
  import { createEventDispatcher } from 'svelte'
  import { eye, eyeSlash } from 'svelte-awesome/icons'
  import IconButton from './IconButton.svelte'

  const dispatch = createEventDispatcher<{ validate: { valid: boolean } }>()

  export let placeholder = ''
  export let value = ''
  export let validators: Validator[] = []
  const validator = buildValidator(...validators)

  let hidden = true
  let focused = false
  let validated = { valid: true, error: '' } as Validated

  $: type = hidden ? 'password' : 'text'
  $: data = hidden ? eyeSlash : eye
  $: touched = touched || ((value?.length ?? 0) > 0 && value !== '')
  $: if (focused && touched) validated = validator(value)
  $: if (validated) dispatch('validate', { valid: validated.valid })

  function onClick() {
    hidden = !hidden
  }

  function onInput({ target }: Event) {
    focused = true
    if (!(target instanceof HTMLInputElement)) return

    value = target.value
  }

  function onFocus() {
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
  <div class="relative">
    <input {type} {value} on:input={onInput} on:blur={onBlur} {placeholder} on:focus={onFocus} />
    <div class="absolute">
      <IconButton {data} scale={1.2} on:click={onClick} hoverAnimation="shadow" />
    </div>
  </div>
  <div class="error">{validated.error}</div>
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .relative {
    position: relative;
    display: flex;
    flex-direction: row;
  }

  .absolute {
    position: absolute;
    right: 0;
    z-index: 1;
    padding: 1rem 0;
    bottom: -0.7rem;
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
