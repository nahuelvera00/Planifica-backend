import { AccountConfirmedException } from "../exceptions/authExceptions/AccountConfirmedException";
import { AccountUnconfirmedException } from "../exceptions/authExceptions/AccountUnconfirmedException";
import { BadCredentialsException } from "../exceptions/authExceptions/BadCredentialsException";
import { InternalErrorException } from "../exceptions/authExceptions/InternalErrorException";
import { UserExistException } from "../exceptions/authExceptions/UserExistException";
import helper from "../helpers/helper";
import UserModel from "../models/UserModel";
import { LoginProps, NewUserProps, RecoverPasswordProps, UserProps } from "../types/types";

class AuthService {
    constructor() { }


    // ---------------------- Create User ------------------------
    async createUser(data: NewUserProps) {

        const { email } = data


        // Verify existing user
        const userExist = await UserModel.findOne({ email: email })


        if (userExist) {
            // If the user exists runs the following exception
            throw new UserExistException(true, "User already exists.")
        }

        // Create user
        try {

            const newUser = new UserModel(data)
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
            const user: UserProps | null = await UserModel.findOne({ token })

            if (!user) {
                throw new BadCredentialsException(true, "Invalid token.")
                return
            }

            if (user.confirmed) {
                throw new AccountConfirmedException(true, "Account Already Confirmed")
                return
            }

            user.confirmed = true
            user.token = ""
            await user.save()

            return { error: false, msg: "User confirmed successfully." }

        } catch (error) {
            console.log("CONFIRM_ACCOUNT_ERROR", error);
            return error
        }
    }

    // ---------------------- Login ------------------------
    async login(data: LoginProps) {

        const { email, password } = data

        try {
            const user: UserProps | null = await UserModel.findOne({ email: email })

            if (!user) {
                throw new BadCredentialsException(true, "Invalid credentials.")
            }

            if (!user.confirmed) {
                throw new AccountUnconfirmedException(true, "Account Unconfirmed.")
            }

            if (!await helper.validatePassword(password, user.password)) {
                throw new BadCredentialsException(true, "Invalid password.")
            }

            user.token = helper.generateJWT(user._id)

            return { error: false, user: helper.transformNonSensitiveUser(user) }

        } catch (error) {
            console.log("LOGIN_ERROR", error);
            return error
        }
    }

    // ---------------------- Recover Password ------------------------
    async recoverPassword(data: RecoverPasswordProps) {

        const user = await UserModel.findOne({ email: data.email })

        if (!user) {
            throw new BadCredentialsException(true, "Invalid credentials.")
        }

        try {
            user.token = helper.generateToken()
            user.save()

            // SEND EMAIL

            return { error: false, msg: "We send you an email so you can recover your password" }
        } catch (error) {
            console.log("RECOVER_PASSWORD_ERROR", error);
            return error
        }
    }

}

export default new AuthService()