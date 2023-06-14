
export class UserExistException extends Error {
    isError: boolean
    msg: string

    constructor(isError: boolean, msg: string) {
        super(msg)
        this.name = "UserExistException"
        this.isError = isError
        this.msg = msg
    }

}