import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router()

router.post("/", (req, res) => AuthController.register(req, res))

export default router;