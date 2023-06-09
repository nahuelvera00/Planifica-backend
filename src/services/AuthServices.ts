import { AccountConfirmedException } from "../exceptions/AccountConfirmedException";
import { BadCredentialsException } from "../exceptions/BadCredentialsException";
import { InternalErrorException } from "../exceptions/InternalErrorException";
import { UserExistException } from "../exceptions/UserExistException";
import helper from "../helpers/helper";
import User from "../models/UserModel";
import { NewUserProps, UserWithIdProps } from "../types/types";

class AuthService {
  constructor() { }


  // ---------------------- Create User ------------------------
  async createUser(data: NewUserProps) {

    const { email } = data


    // Verify existing user
    const userExist = await User.findOne({ email: email })


    if (userExist) {
      // If the user exists runs the following exception
      throw new UserExistException(true, "User already exists.")
    }

    // Create user
    try {

      const newUser = new User(data)
      newUser.token = helper.generateToken()
      await newUser.save()

      return { error: false, msg: "User created successfully." }

    } catch (error) {
      console.log("CREATE_USER_ERROR", error);
      throw new InternalErrorException(true, "INTERNAL_ERROR")
    }
  }

  // ---------------------- Confirm account ------------------------
  async confirmAccount(token: string) {

    try {
      const user: UserWithIdProps | null = await User.findOne({ token: token })

      if (!user) {
        throw new BadCredentialsException(true, "Invalid token.")
      }

      if (user.confirmed) {
        throw new AccountConfirmedException(true, "Account Already Confirmed")
      }

      user.confirmed = true
      user.token = ""
      await user.save()

      return { error: false, msg: "User confirmed successfully." }

    } catch (error) {
      console.log("CONFIRM_ACCOUNT_ERROR", error);
      throw new InternalErrorException(true, "INTERNAL_ERROR")
    }
  }

}

export default new AuthService()