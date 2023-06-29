export class InvalidActionGroupException extends Error {
    isError: boolean
    msg: string

    constructor(isError: boolean, msg: string) {
        super(msg)
        this.name = "InvalidActionGroupException"
        this.isError = isError
        this.msg = msg
    }
}