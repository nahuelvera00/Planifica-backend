export class AccountConfirmedException extends Error {
    isError: boolean
    msg: string

    constructor(isError: boolean, msg: string) {
        super(msg)
        this.name = "AccountConfirmedException"
        this.isError = isError
        this.msg = msg
    }
}