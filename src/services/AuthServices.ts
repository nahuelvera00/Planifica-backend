import { InternalErrorException } from "../exceptions/InternalErrorException";
import { UserExistException } from "../exceptions/UserExistException";
import helper from "../helpers/helper";
import User from "../models/UserModel";
import { NewUserProps } from "../types/types";

class AuthService {
  constructor() { }


  // ---------------------- Create User ------------------------
  async createUser(data: NewUserProps) {

    const { email } = data


    // Verify existing user
    const userExist = await User.findOne({ email: email })


    if (userExist) {
      // If the user exists runs the following exception
      throw new UserExistException(true, "User already exists")
    }

    // Create user
    try {

      const newUser = new User(data)
      newUser.token = helper.generateToken()
      await newUser.save()

      return { error: false, msg: "User created successfully" }

    } catch (error) {
      throw new InternalErrorException(true, "INTERNAL_ERROR")
    }

  }

}

export default new AuthService()