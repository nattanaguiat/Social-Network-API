import { Router } from "express";

const router = Router();

router.use('./users', userRouter)
router.use('./thouth' thoughtsRouter)
