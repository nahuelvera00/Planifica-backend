
export class InternalErrorException extends Error {
    isError: boolean
    msg: string

    constructor(isError: boolean, msg: string) {
        super(msg)
        this.name = "InternalErrorException"
        this.isError = isError
        this.msg = msg
    }

}