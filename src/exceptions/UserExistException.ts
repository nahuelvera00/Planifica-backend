
export class UserExistException extends Error {
  error: boolean
  msg: string

  constructor(error: boolean, msg: string) {
    super(msg)
    this.name = "UserExistException"
    this.error = error
    this.msg = msg
  }

}