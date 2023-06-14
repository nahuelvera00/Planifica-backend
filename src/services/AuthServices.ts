import { AccountConfirmedException } from "../exceptions/authExceptions/AccountConfirmedException";
import { AccountUnconfirmedException } from "../exceptions/authExceptions/AccountUnconfirmedException";
import { BadCredentialsException } from "../exceptions/authExceptions/BadCredentialsException";
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

        // If the user exists runs the following exception
        if (userExist) {
            throw new UserExistException(true, "User already exists.")
        }

        try {
            // Create user
            const newUser: UserProps | null = new UserModel(data)
            newUser.token = helper.generateToken()
            await newUser.save()

            return { error: false, msg: "User created successfully." }

        } catch (error) {
            console.log("CREATE_USER_ERROR", error);
            return error
        }
    }

    // ---------------------- Confirm account ------------------------
    async confirmAccount(token: string) {

        const user: UserProps | null = await UserModel.findOne({ token })

        if (!user) {
            throw new BadCredentialsException(true, "Invalid token.")
            return
        }

        if (user.confirmed) {
            throw new AccountConfirmedException(true, "Account Already Confirmed")
            return
        }

        try {
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

        try {

            user.token = helper.generateJWT(user._id)

            return { error: false, user: helper.transformNonSensitiveUser(user) }

        } catch (error) {
            console.log("LOGIN_ERROR", error);
            return error
        }
    }

    // ---------------------- Recover Password ------------------------
    async recoverPassword(data: RecoverPasswordProps) {

        // Get user
        const user = await UserModel.findOne({ email: data.email })

        // If don´t exist user
        if (!user) {
            throw new BadCredentialsException(true, "Invalid credentials.")
        }

        try {
            // generate new token
            user.token = helper.generateToken()
            await user.save()

            // SEND EMAIL

            // Retun message
            return { error: false, msg: "We send you an email so you can recover your password" }
        } catch (error) {
            console.log("RECOVER_PASSWORD_ERROR", error);
            return error
        }
    }

    // ---------------------- Check token ------------------------
    async check(token: string) {

        const validToken = await UserModel.findOne({ token: token })

        if (!validToken) {
            throw new BadCredentialsException(false, "Invalid Token.")
        }

        try {
            return { error: false, msg: "Valid token." }
        } catch (error) {
            console.log("CHECK_TOKEN_ERROR", error);
            return error
        }
    }

    async updatePassword(token: string, password: string) {

        const user: UserProps | null = await UserModel.findOne({ token })

        if (!user) {
            throw new UserExistException(true, "Invalid token.")
        }

        try {
            user.token = ""
            user.password = password

            await user.save()

            return { error: false, msg: "Your password was successfully reset" };
        } catch (error) {
            return error
        }
    }


}

export default new AuthService()