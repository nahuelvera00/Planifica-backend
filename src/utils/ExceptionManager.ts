import { AccountConfirmedException } from "../exceptions/authExceptions/AccountConfirmedException";
import { AccountUnconfirmedException } from "../exceptions/authExceptions/AccountUnconfirmedException";
import { BadCredentialsException } from "../exceptions/authExceptions/BadCredentialsException";
import { InternalErrorException } from "../exceptions/authExceptions/InternalErrorException";
import { UserExistException } from "../exceptions/authExceptions/UserExistException";
import { ExceptionResponse } from "../types/types";

function exceptionManager(error: Error): ExceptionResponse {

    // This exception is executed when a user cannot be found in DB
    if (error instanceof UserExistException) {
        return { status: 409, msg: error.msg, isError: error.error }
    }

    // Internal eeror: DB, other...
    if (error instanceof InternalErrorException) {
        return { status: 500, msg: error.msg, isError: error.error }
    }

    // This exception is executed by some erroneous data by the user.
    if (error instanceof BadCredentialsException) {
        return { status: 400, msg: error.msg, isError: error.error }
    }

    // This exception is executed when you want to confirm an account
    // already confirmed.
    if (error instanceof AccountConfirmedException) {
        return { status: 400, msg: error.msg, isError: error.error }
    }

    // This exception is executed when you want to start when making a 
    // request with an unconfirmed account.
    if (error instanceof AccountUnconfirmedException) {
        return { status: 400, msg: error.msg, isError: error.error }
    }

    return { status: 500, msg: "ERROR", isError: true }

}

export default exceptionManager