export class AccountUnconfirmedException extends Error {
    error: boolean
    msg: string

    constructor(error: boolean, msg: string) {
        super(msg)
        this.name = "AccountUnconfirmedException"
        this.error = error
        this.msg = msg
    }

}