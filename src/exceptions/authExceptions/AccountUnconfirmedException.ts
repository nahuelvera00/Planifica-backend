export class AccountUnconfirmedException extends Error {
    isError: boolean
    msg: string

    constructor(isError: boolean, msg: string) {
        super(msg)
        this.name = "AccountUnconfirmedException"
        this.isError = isError
        this.msg = msg
    }

}