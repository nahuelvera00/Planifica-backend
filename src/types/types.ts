import { Document } from "mongoose"

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

export interface GroupProps extends Document {
    name: string,
    schedules: ScheduleProps[]
}

export interface ScheduleProps extends Document {
    days: Day,
    startTime: string,
    endTime: string
}


enum Day {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
}