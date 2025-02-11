import { Router} from 'express';

import userRouter from "./user.routes";
import thoughtsRouter from "./thoughts.routes";

const router = Router();

router.use('/users', userRouter)
router.use('/thought', thoughtsRouter)

export default router;