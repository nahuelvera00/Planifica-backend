export class GroupNotFoundException extends Error {
    isError: boolean
    msg: string

    constructor(isError: boolean, msg: string) {
        super(msg)
        this.name = "GroupNotFoundException"
        this.isError = isError
        this.msg = msg
    }
}