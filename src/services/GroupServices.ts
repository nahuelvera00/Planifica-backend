import { InvalidFormatDayException } from "../exceptions/groupExceptions/InvalidFormatDayException";
import { InvalidNameException } from "../exceptions/groupExceptions/InvalidNameException";
import { InvalidTimeFormatException } from "../exceptions/groupExceptions/InvalidTimeFormatException";
import GroupModel from "../models/GroupModel";
import { GroupProps, NewGroupProps, UserProps } from "../types/types";
import { isDay, isString, isTime } from "../utils/ValidateType";

class GroupService {
    constructor() { }

    // --------------------------- CREATE GROUP -------------------------------------
    async create(data: NewGroupProps, user: UserProps | null) {

        const { name, schedules } = data

        // VALIDATE DATA
        // Validate name
        if (!isString(name)) {
            throw new InvalidNameException(true, "Invalid name.")
        }

        // Validate SCHEDULES
        for (const schedule of schedules) {
            const { day, startTime, endTime } = schedule
            if (!isDay(day)) {
                throw new InvalidFormatDayException(true, "Invalid day format.")
            }
            if (!isTime(startTime) || !isTime(endTime)) {
                throw new InvalidTimeFormatException(true, "Invalid Time.")
            }
        }

        const newGroup: GroupProps | null = new GroupModel({ name, user, schedules })

        try {
            await newGroup.save()
            return { error: false, msg: "Create group successfully." }
        } catch (error) {
            console.log("CREATE_GROUP_ERROR", error);
            return error
        }
    }
}

export default new GroupService()