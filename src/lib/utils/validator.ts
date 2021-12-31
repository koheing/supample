export type Validator = (value?: string) => boolean | string
export type Validated = { valid: boolean; error: string }

export const required: Validator = (value) => (!!value && value !== '') || '必須入力です'
export const minLength =
  (min: number): Validator =>
  (value) =>
    (!!value && value.length > min) || `${min + 1} 文字以上入力してください`

export const buildValidator =
  (...validators: Validator[]) =>
  (value?: string): Validated => {
    let message = ''
    for (const validate of validators) {
      const valid = validate(value)
      if (typeof valid !== 'string') continue

      message = valid
      if (message !== '') break
    }

    return {
      valid: message === '',
      error: message,
    }
  }
