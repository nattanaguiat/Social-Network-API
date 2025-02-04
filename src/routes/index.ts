import { Router } from "express";
import { userRouter } from "./api/user.routes";
import { thoughtsRouter } from "./api/thouths.routes";

const router = Router();

router.use('./users', userRouter)
router.use('./thouth', thoughtsRouter)
