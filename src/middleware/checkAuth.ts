import { NextFunction, Request, RequestHandler, Response } from "express";
import UserModel from "../models/UserModel";
import { CustomReq } from "../types/types";
const jwt = require("jsonwebtoken")

const checkAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    let token;

    const customReq = req as CustomReq

    if (customReq.headers.authorization && customReq.headers.authorization.startsWith("Bearer")) {
        try {

            token = customReq.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            customReq.user = await UserModel.findById(decoded.id).select("-password -confirmed -token -avatar -name -lastname -createdAt -updatedAt -__v")

            return next()
        } catch (error) {
            return res.status(404).json({ error: true, msg: "ERROR" })
        }
    }

    if (!token) {
        return res.status(404).json({ error: true, msg: "Invalid Token" })
    }
}

export default checkAuth