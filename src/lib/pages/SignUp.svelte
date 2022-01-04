<script lang="ts">
  import { required } from '../utils/validator'

  import Button from '../views/atoms/Button.svelte'
  import PasswordInput from '../views/atoms/PasswordInput.svelte'
  import TextInput from '../views/atoms/TextInput.svelte'
  import type { ValidateEvent } from '../views/atoms/TextInput.svelte'
  import { push } from 'svelte-spa-router'
  import { signUp, userId } from '../stores/auth.store'
  import { tick } from 'svelte'
  import Card from '../views/atoms/Card.svelte'

  let textInput: TextInput
  let passwordInput: PasswordInput
  let email = ''
  let password = ''
  let state = [false, false]

  $: canSignUp = state.every((it) => it)
  $: if ($userId !== '') push('/')

  function onEmailValidate(e: ValidateEvent) {
    state[0] = e.detail.valid
  }

  function onPasswordValidate(e: ValidateEvent) {
    state[1] = e.detail.valid
  }

  async function onClick() {
    textInput.validate()
    passwordInput.validate()

    await tick()

    canSignUp && (await signUp(email, password))
  }

  async function moveToSignIn() {
    await push('/signin')
  }
</script>

<Card>
  <div class="title">Sign up</div>

  <div class="form">
    <TextInput
      bind:value={email}
      placeholder="email"
      validators={[required]}
      on:validate={onEmailValidate}
      bind:this={textInput}
    />
    <PasswordInput
      bind:value={password}
      placeholder="password"
      validators={[required]}
      on:validate={onPasswordValidate}
      bind:this={passwordInput}
    />
  </div>

  <div class="note">
    <div>「OK」ボタンを押すと、入力したメールアドレスにメールが送信されます。</div>
    <div>メール本文のリンクをクリックして登録を完了させてください。</div>
  </div>

  <div class="button">
    <Button on:click={onClick} disabled={!canSignUp}>OK</Button>
  </div>

  <div class="link"><span class="link-text" on:click={moveToSignIn}>サインイン</span>へ</div>
</Card>

<style>
  .title {
    font-size: 2rem;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 2.5rem 0;
  }

  .note {
    font-size: x-small;
    margin: 1rem 0;
  }

  .button {
    width: 80%;
    display: flex;
    margin: auto;
  }

  .link {
    width: 100%;
    font-size: smaller;
    margin-top: 2.5rem;
  }

  .link-text {
    cursor: pointer;
  }

  .link-text:hover {
    text-decoration: underline;
    color: var(--ac-color);
  }
</style>
