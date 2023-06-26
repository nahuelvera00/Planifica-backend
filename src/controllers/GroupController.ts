import { Response } from 'express';
import { CustomReq, NewGroupProps } from "../types/types";
import GroupServices from '../services/GroupServices';
import exceptionManager from '../utils/ExceptionManager';

class GroupController {
    constructor() { }

    // -------------- Get groups ------------------------


    // ------ Add new group --------------- 
    async create(req: CustomReq, res: Response) {
        const user = req.user
        const data: NewGroupProps = req.body

        try {
            const result = await GroupServices.create(data, user)
            return res.status(200).json(result)
        } catch (error: Error | unknown) {
            return exceptionManager(res, error)
        }
    }


    // ------------- Update group -------------------
    async update() {

    }

    // ------------- Delete group -------------------
    async delete() {

    }

}

export default new GroupController();
