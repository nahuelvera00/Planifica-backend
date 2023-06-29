import { GroupNotFoundException } from "../exceptions/groupExceptions/GroupNotFoundException";
import { InvalidActionGroupException } from "../exceptions/groupExceptions/InvalidActionGroup";
import { InvalidFormatDayException } from "../exceptions/groupExceptions/InvalidFormatDayException";
import { InvalidNameException } from "../exceptions/groupExceptions/InvalidNameException";
import { InvalidTimeFormatException } from "../exceptions/groupExceptions/InvalidTimeFormatException";
import GroupModel from "../models/GroupModel";
import { GroupProps, SensitiveGroupProps, UserProps } from "../types/types";
import { isDay, isString, isTime } from "../utils/ValidateType";

class GroupService {
    constructor() { }

    // ---------------------------- GET GROUP BY USERID ------------------------------------
    async get(userId: string) {

        try {
            const schedules: GroupProps[] = await GroupModel.find({ user: userId }).select("-user -__v")
            return { error: false, schedules }
        } catch (error) {
            console.log("GET_GROUP_ERROR", error);
            return error
        }
    }

    // --------------------------- CREATE GROUP -------------------------------------
    async create(data: SensitiveGroupProps, user: UserProps | null) {

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
                throw new InvalidTimeFormatException(true, "Invalid time.")
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

    // -------------------------- UPDATE GROUP --------------------------------------
    async update(data: SensitiveGroupProps, user: UserProps | null) {
        const { name, schedules } = data

        // VALIDATION
        // Validate existing group
        const groupExist: GroupProps | null = await GroupModel.findById(data._id)
        if (!groupExist) {
            throw new GroupNotFoundException(true, "Group not found.")
        }

        // Validate user
        if (groupExist.user.toString() !== user?._id.toString()) {
            throw new InvalidActionGroupException(true, "Invalid Action, you do not have the necessary permissions for this action.")
        }

        try {
            groupExist.name = name || groupExist.name
            groupExist.schedules = schedules || groupExist.schedules

            await groupExist.save()
            return { error: false, msg: "Group successfully updated" }
        } catch (error) {
            console.log("UPDATE_GROUP_ERROR", error);
            return error
        }
    }

    // -------------------------- DELETE GROUP --------------------------------------
    async delete(groupId: string, userId: string) {

        // VALIDATION
        // Validate existing group
        const groupExist: GroupProps | null = await GroupModel.findById(groupId)
        if (!groupExist) {
            throw new GroupNotFoundException(true, "Group not found.")
        }

        // Validate user
        if (groupExist.user.toString() !== userId.toString()) {
            throw new InvalidActionGroupException(true, "Invalid Action, you do not have the necessary permissions for this action.")
        }

        try {
            await groupExist.deleteOne()
            return { error: false, msg: "Group successfully deleted" }
        } catch (error) {
            console.log("DELETE_GROUP_ERROR", error);
            return error
        }
    }
}

export default new GroupService()