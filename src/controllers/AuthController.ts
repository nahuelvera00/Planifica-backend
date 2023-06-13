
import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";
import { ExceptionResponse, LoginProps, NewUserProps, RecoverPasswordProps } from "../types/types"; import exceptionManager from "../utils/ExceptionManager";

class AuthController {
    constructor() { }

    //---------- REGISTER USER ----------------
    async register(req: Request, res: Response) {

        // Set data from request
        const data: NewUserProps = req.body

        try {
            // Call AuthService
            const newUser = await AuthServices.createUser(data)

            return res.status(201).json(newUser.msg)

        } catch (error: Error | any) {
            console.log(error);

            const errorManager: ExceptionResponse = exceptionManager(error)
            return res.status(errorManager.status).json({ msg: errorManager.msg, error: errorManager.isError })

        }
    }

    // --------- CONFIRM ACCOUNT ----------------
    async confirmAccount(req: Request, res: Response) {

        const { token } = req.params

        try {
            const result = await AuthServices.confirmAccount(token)

            return res.status(200).json(result)

        } catch (error: Error | any) {
            console.log(error);

            const errorManager: ExceptionResponse = exceptionManager(error)
            return res.status(errorManager.status).json({ msg: errorManager.msg, error: errorManager.isError })

        }
    }

    // -------------------- LOGIN -----------------------
    async login(req: Request, res: Response) {

        const data: LoginProps = req.body

        try {

            const result = await AuthServices.login(data)

            return res.status(200).json(result)

        } catch (error: Error | any) {
            console.log(error);

            const errorManager: ExceptionResponse = exceptionManager(error)
            return res.status(errorManager.status).json({ msg: errorManager.msg, error: errorManager.isError })
        }
    }

    // --------- RECOVER PASSWORD ----------------
    async recoverPassword(req: Request, res: Response) {

        const data: RecoverPasswordProps = req.body

        try {
            const result = await AuthServices.recoverPassword(data)

            return res.status(200).json(result)
        } catch (error: Error | any) {
            console.log(error);

            const errorManager: ExceptionResponse = exceptionManager(error)
            return res.status(errorManager.status).json({ msg: errorManager.msg, error: errorManager.isError })
        }
    }



}

export default new AuthController();