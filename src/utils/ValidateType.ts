import { Day } from "../types/types"

export const isString = (string: String): boolean => {
    return typeof string === "string"
}

export const isDay = (day: any): boolean => {
    return Object.values(Day).includes(day)
}

export const isTime = (time: string): boolean => {
    if (time.length > 5 || time.length < 5) {
        return false
    }

    const startHour = Number(time.split(":")[0])
    const startMinutes = Number(time.split(":")[1])

    if (startHour > 24 || startHour < 0 || startMinutes > 59 || startMinutes < 0) {
        return false
    }
    return true
}