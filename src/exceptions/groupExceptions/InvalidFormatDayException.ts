export class InvalidFormatDayException extends Error {
    isError: boolean
    msg: string

    constructor(isError: boolean, msg: string) {
        super(msg)
        this.name = "InvalidFormatDayException"
        this.isError = isError
        this.msg = msg
    }
}