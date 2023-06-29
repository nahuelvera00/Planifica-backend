import { Response } from 'express';
import { CustomReq, SensitiveGroupProps, UserProps } from "../types/types";
import GroupServices from '../services/GroupServices';
import exceptionManager from '../utils/ExceptionManager';

class GroupController {
    constructor() { }

    // -------------- Get groups ---------------
    async getAllByUserId(req: CustomReq, res: Response) {
        const user = req.user

        try {
            const result = await GroupServices.get(user?._id)
            return res.status(200).json(result)
        } catch (error: Error | unknown) {
            return exceptionManager(res, error)
        }
    }

    // ------ Add new group --------------- 
    async create(req: CustomReq, res: Response) {
        const user = req.user
        const data: SensitiveGroupProps = req.body

        try {
            const result = await GroupServices.create(data, user)
            return res.status(200).json(result)
        } catch (error: Error | unknown) {
            return exceptionManager(res, error)
        }
    }


    // ------------- Update group -------------------
    async update(req: CustomReq, res: Response) {
        const user: UserProps | null = req.user
        const data: SensitiveGroupProps = req.body

        try {
            const result = await GroupServices.update(data, user)
            return res.status(200).json(result)

        } catch (error: Error | unknown) {
            return exceptionManager(res, error)
        }
    }

    // ------------- Delete group -------------------
    async delete(req: CustomReq, res: Response) {
        const user: UserProps | null = req.user
        const { groupId } = req.params

        try {
            const result = await GroupServices.delete(groupId, user?._id)
            return res.status(200).json(result)
        } catch (error: Error | unknown) {
            return exceptionManager(res, error)
        }
    }

}

export default new GroupController();
