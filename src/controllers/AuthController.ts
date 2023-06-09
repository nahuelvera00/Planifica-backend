
import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";
import { UserExistException } from "../exceptions/UserExistException";
import { InternalErrorException } from "../exceptions/InternalErrorException";

class AuthController {
  constructor() { }




  //---------- REGISTER USER ----------------

  async register(req: Request, res: Response) {

    try {
      const newUser = await AuthServices.createUser(req.body)

      return res.status(201).json(newUser.msg)

    } catch (error: UserExistException | InternalErrorException | any) {

      if (error instanceof UserExistException) {
        return res.status(409).json({ msg: error.msg, error: error.error })
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