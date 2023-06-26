
import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";
import { LoginProps, NewUserProps, RecoverPasswordProps } from "../types/types"; import exceptionManager from "../utils/ExceptionManager";

class AuthController {
    constructor() { }

    //---------- REGISTER USER ----------------
    async register(req: Request, res: Response) {

        // Set data from request
        const data: NewUserProps = req.body

        try {
            // Call AuthService
            const newUser = await AuthServices.createUser(data)

            return res.status(201).json(newUser)

        } catch (error: Error | unknown) {

            return exceptionManager(res, error)

        }
    }

    // --------- CONFIRM ACCOUNT ----------------
    async confirmAccount(req: Request, res: Response) {

        const { token } = req.params

        try {
            const result = await AuthServices.confirmAccount(token)

            return res.status(200).json(result)

        } catch (error: Error | unknown) {

            return exceptionManager(res, error)

        }
    }

    // -------------------- LOGIN -----------------------
    async login(req: Request, res: Response) {
        const data: LoginProps = req.body

        try {
            const result = await AuthServices.login(data)
            return res.status(200).json(result)

        } catch (error: Error | unknown) {
            return exceptionManager(res, error)
        }
    }

    // --------- RECOVER PASSWORD ----------------
    async recoverPassword(req: Request, res: Response) {

        const data: RecoverPasswordProps = req.body

        try {
            const result = await AuthServices.recoverPassword(data)

            return res.status(200).json(result)
        } catch (error: Error | unknown) {

            return exceptionManager(res, error)

        }
    }

    // --------- CHECK TOKEN FOR RECOVER PASSWORD ----------------
    async check(req: Request, res: Response) {

        try {
            const { token } = req.params
            const result = await AuthServices.check(token)

            return res.status(200).json(result)
        } catch (error: Error | unknown) {
            return exceptionManager(res, error)
        }
    }

    async updatePassword(req: Request, res: Response) {

        try {
            const { token } = req.params
            const { password } = req.body

            const result = await AuthServices.updatePassword(token, password)
            return res.status(200).json(result)
        } catch (error: Error | unknown) {
            return exceptionManager(res, error)
        }
    }
}

export default new AuthController();