export class BadCredentialsException extends Error {
  error: boolean
  msg: string

  constructor(error: boolean, msg: string) {
    super(msg)
    this.name = "BadCredentialsException"
    this.error = error
    this.msg = msg
  }

}