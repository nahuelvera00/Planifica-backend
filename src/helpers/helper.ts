import { NonSensitiveUserProps, UserProps } from "../types/types";

const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


class Helper {
    constructor() { }

    generateToken(): string {
        return Math.random().toString(32).substring(2) + Date.now().toString(32)
    }

    generateJWT(id: string) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })
    }

    async validatePassword(enteredPassword: string, password: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, password)
    }

    transformNonSensitiveUser(user: UserProps): NonSensitiveUserProps {
        const { _id, username, name, lastname, email, token, avatar } = user
        const NonSensitiveData = {
            _id,
            username,
            name,
            lastname,
            email,
            token,
            avatar
        }
        return NonSensitiveData
    }

}

export default new Helper()