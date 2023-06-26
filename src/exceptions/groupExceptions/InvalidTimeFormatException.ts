export class InvalidTimeFormatException extends Error {
    isError: boolean
    msg: string

    constructor(isError: boolean, msg: string) {
        super(msg)
        this.name = "InvalidTimeFormatException"
        this.isError = isError
        this.msg = msg
    }
}