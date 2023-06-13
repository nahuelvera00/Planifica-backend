export class AccountConfirmedException extends Error {
    error: boolean
    msg: string

    constructor(error: boolean, msg: string) {
        super(msg)
        this.name = "AccountConfirmedException"
        this.error = error
        this.msg = msg
    }
}