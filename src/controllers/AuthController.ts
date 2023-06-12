
import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";
import { UserExistException } from "../exceptions/authExceptions/UserExistException";
import { InternalErrorException } from "../exceptions/authExceptions/InternalErrorException";
import { LoginProps, NewUserProps } from "../types/types";
import { BadCredentialsException } from "../exceptions/authExceptions/BadCredentialsException";
import { AccountConfirmedException } from "../exceptions/authExceptions/AccountConfirmedException";
import { AccountUnconfirmedException } from "../exceptions/authExceptions/AccountUnconfirmedException";

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

    } catch (error: UserExistException | InternalErrorException | any) {

      // If the email entered belongs to another user, this exception will be used.
      if (error instanceof UserExistException) {
        return res.status(409).json({ msg: error.msg, error: error.error })
      }

      // If there is an error in the DB when creating a user this exception will be executed
      if (error instanceof InternalErrorException) {
        return res.status(500).json({ msg: error.msg, error: error.error })
      }
      console.log(error);
      return res.status(500).json({ msg: "ERROR", error: true })

    }
  }

  // --------- CONFIRM ACCOUNT ----------------
  async confirmAccount(req: Request, res: Response) {

    const { token } = req.params

    try {
      const result = await AuthServices.confirmAccount(token)

      return res.status(200).json(result)

    } catch (error) {
      if (error instanceof BadCredentialsException) {
        return res.status(400).json({ msg: error.msg, error: error.error })
      }

      if (error instanceof AccountConfirmedException) {
        return res.status(400).json({ msg: error.msg, error: error.error })
      }

      if (error instanceof InternalErrorException) {
        return res.status(500).json({ msg: error.msg, error: error.error })
      }
      console.log("SERVICE", error);
      return res.status(500).json({ msg: "ERROR", error: true })
    }
  }

  // --------- LOGIN ----------------
  async login(req: Request, res: Response) {

    const data: LoginProps = req.body

    try {

      const result = await AuthServices.login(data)

      return res.status(200).json(result)

    } catch (error) {
      if (error instanceof BadCredentialsException) {
        return res.status(400).json({ msg: error.msg, error: error.error })
      }
      if (error instanceof AccountUnconfirmedException) {
        return res.status(400).json({ msg: error.msg, error: error.error })
      }
      if (error instanceof InternalErrorException) {
        return res.status(500).json({ msg: error.msg, error: error.error })
      }
      console.log(error);
      return res.status(500).json({ msg: "ERROR", error: true })
    }



  }


}

export default new AuthController();