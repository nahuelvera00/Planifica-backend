
export class InternalErrorException extends Error {
  error: boolean
  msg: string

  constructor(error: boolean, msg: string) {
    super(msg)
    this.name = "InternalErrorException"
    this.error = error
    this.msg = msg
  }

}