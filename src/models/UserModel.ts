import { UserProps } from './../types/types';
import mongoose, { Schema } from "mongoose";
const bcrypt = require('bcrypt');

const userSchema = new Schema<UserProps>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        unique: false,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        unique: false,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        required: false,
        default: "placeholder.jpg",
        trim: true
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (passwordForm: string) {
    return await bcrypt.comparePassword(passwordForm, this.password)
}

const UserModel = mongoose.model<UserProps>("User", userSchema)

export default UserModel;