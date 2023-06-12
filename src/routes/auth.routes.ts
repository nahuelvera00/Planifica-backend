import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router()

router.post("/", (req, res) => AuthController.register(req, res))
router.get("/confirm/:token", (req, res) => AuthController.confirmAccount(req, res))
router.post("/login", (req, res) => AuthController.login(req, res))

export default router;