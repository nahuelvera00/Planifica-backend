export class InvalidNameException extends Error {
    isError: boolean
    msg: string

    constructor(isError: boolean, msg: string) {
        super(msg)
        this.name = "InvalidNameException"
        this.isError = isError
        this.msg = msg
    }
}