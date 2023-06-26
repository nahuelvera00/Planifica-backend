import { Request } from "express"
import { Document } from "mongoose"

// ---------------------- USER TYPES ------------------------------------------
export interface UserProps extends Document {
    username: string
    name: string
    lastname: string
    email: string
    password: string
    token: string
    confirmed: boolean
    avatar: string
}

export interface NonSensitiveUserProps {
    username: string
    name: string
    lastname: string
    email: string
    token: string
    avatar: string
}

export interface ExceptionResponse {
    status: number,
    msg: string,
    isError: boolean
}

export type NewUserProps = Omit<UserProps, "token" | "confirmed" | "avatar">

export type LoginProps = Pick<UserProps, "email" | "password">

export type RecoverPasswordProps = Pick<UserProps, "email">



// ----------------------------- GROUP TYPES -----------------------------

export interface GroupProps extends Document {
    name: string,
    user: UserProps["_id"],
    schedules: ScheduleProps[]
}

export type NewGroupProps = Omit<GroupProps, "user">

export interface ScheduleProps {
    day: Day,
    startTime: string,
    endTime: string
}


export enum Day {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
}

// ------------------------ CUSTOM REQUEST----------------------------------------
export interface CustomReq extends Request {
    user: UserProps | null
}