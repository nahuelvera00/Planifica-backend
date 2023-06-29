import { Router } from "express";
import GroupController from "../controllers/GroupController";
import checkAuth from "../middleware/checkAuth";
import { CustomReq } from "../types/types";

const router = Router()

router.route("/")
    .get(checkAuth, (req, res) => GroupController.getAllByUserId(req as CustomReq, res))
    .post(checkAuth, (req, res) => GroupController.create(req as CustomReq, res))
    .put(checkAuth, (req, res) => GroupController.update(req as CustomReq, res))

router.delete("/:groupId", checkAuth, (req, res) => GroupController.delete(req as CustomReq, res))

export default router